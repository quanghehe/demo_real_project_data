import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import "./Checkout.css";

export default function Checkout() {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false); // ✅ trạng thái đặt hàng xong
  const navigate = useNavigate();

  const API_BASE = "http://127.0.0.1:8000";

  // 🟢 Lấy giỏ hàng và thông tin khách
  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const [cartRes, userRes] = await Promise.all([
          fetch(`${API_BASE}/cart/${user.user_id}`),
          fetch(`${API_BASE}/api/users/${user.user_id}`)
        ]);

        if (cartRes.ok) {
          const cartData = await cartRes.json();
          setCart(cartData.items || []);
        }

        if (userRes.ok) {
          const userData = await userRes.json();
          setProfile(userData);
        }
      } catch (err) {
        console.error("Fetch checkout data error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // 🟢 Xử lý thanh toán
  const handleCheckout = async () => {
    if (!user) {
      alert("Vui lòng đăng nhập để tiếp tục!");
      navigate("/login");
      return;
    }

    if (!profile?.address || !profile?.phone_number) {
      alert("Vui lòng cập nhật địa chỉ và số điện thoại!");
      navigate("/profile");
      return;
    }

    if (cart.length === 0) {
      alert("Giỏ hàng trống!");
      return;
    }

    try {
      setPlacingOrder(true);

      // chuẩn bị dữ liệu order
      const orderData = {
        user_id: user.user_id,
        total_amount: getTotal(),
        items: cart.map((item) => ({
          product_id: item.product_id,
          name_product: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      // gọi API tạo order
      const res = await fetch(`${API_BASE}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) throw new Error("Lỗi khi đặt hàng");

      // xoá giỏ hàng trên server
      await fetch(`${API_BASE}/cart/${user.user_id}`, { method: "DELETE" });


      window.dispatchEvent(new Event("cartUpdated"));

      setOrderPlaced(true);


    } catch (err) {
      console.error("Checkout error:", err);
      alert("❌ Đặt hàng thất bại. Vui lòng thử lại.");
    } finally {
      setPlacingOrder(false);
    }
  };

  // 🟢 Nếu đã đặt hàng thành công
  if (orderPlaced) {
    return (
      <div className="checkout-success">
        <h2>🎉 Đặt hàng thành công!</h2>
        <p>Cảm ơn bạn đã mua sắm tại ShopQQ. Chúng tôi sẽ liên hệ sớm để giao hàng.</p>
        <Link to="/">🛍️ Tiếp tục mua sắm</Link>
      </div>
    );
  }

  // 🟢 Nếu giỏ hàng trống
  if (cart.length === 0 && !loading) {
    return (
      <div className="checkout-page empty">
        <h2>🛒 Giỏ hàng trống</h2>
        <p>Bạn chưa có sản phẩm nào trong giỏ hàng</p>
        <Link to="/">🛍️ Bắt đầu mua sắm</Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h2>💳 Thanh toán đơn hàng</h2>

      <div className="checkout-container">
        {/* Order Summary */}
        <div className="checkout-summary">
          <h3>📋 Đơn hàng của bạn</h3>

          {cart.map((item) => (
            <div key={item.cart_item_id} className="checkout-item">
              <div className="item-details">
                <span className="item-name">{item.name}</span>
                <span className="item-qty">Số lượng: {item.quantity}</span>
              </div>
              <span className="item-price">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}

          <div className="checkout-total">
            <span>💰 Tổng cộng:</span>
            <span>{formatPrice(getTotal())}</span>
          </div>

          <button
            className="checkout-btn"
            onClick={handleCheckout}
            disabled={loading || placingOrder}
          >
            {placingOrder ? "⏳ Đang đặt hàng..." : "🚀 Xác nhận đặt hàng"}
          </button>
        </div>

        {/* Shipping Info */}
        <div className="checkout-form">
          <h3>🚚 Thông tin giao hàng</h3>
          {loading ? (
            <p>⏳ Đang tải thông tin khách hàng...</p>
          ) : profile ? (
            <div className="shipping-info">
              <div className="info-row">
                <span>👤</span>
                <p><b>Họ tên:</b> {profile.username}</p>
              </div>
              <div className="info-row">
                <span>📧</span>
                <p><b>Email:</b> {profile.email}</p>
              </div>
              <div className="info-row">
                <span>🏠</span>
                <p><b>Địa chỉ:</b> {profile.address || "Chưa cập nhật"}</p>
              </div>
              <div className="info-row">
                <span>📞</span>
                <p><b>Điện thoại:</b> {profile.phone_number || "Chưa cập nhật"}</p>
              </div>
              <Link to="/profile" className="edit-info-link">✏️ Chỉnh sửa thông tin</Link>
            </div>
          ) : (
            <div>
              <p>Bạn cần đăng nhập để đặt hàng</p>
              <Link to="/login">Đăng nhập ngay</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
