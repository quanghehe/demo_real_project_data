import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8000";

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const userRaw = localStorage.getItem("user");
        if (!userRaw) {
          setCartItems([]);
          setLoading(false);
          return;
        }
        const user = JSON.parse(userRaw);

        const res = await fetch(`${API_BASE}/cart/${user.user_id}`);
        if (!res.ok) throw new Error("Lỗi khi tải giỏ hàng");
        const data = await res.json();

        setCartItems(data.items || []); // backend trả { items: [...] }
      } catch (err) {
        console.error("Fetch cart error:", err);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();

    // nghe sự kiện cartUpdated từ ProductDetail
    const handleUpdate = () => fetchCart();
    window.addEventListener("cartUpdated", handleUpdate);
    return () => window.removeEventListener("cartUpdated", handleUpdate);
  }, [API_BASE]);

  const handleQtyChange = async (itemId, qty) => {
    const user = JSON.parse(localStorage.getItem("user"));
    await fetch(`${API_BASE}/cart/${user.user_id}/items/${itemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: qty }),
    });
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleRemove = async (itemId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    await fetch(`${API_BASE}/cart/${user.user_id}/items/${itemId}`, {
      method: "DELETE",
    });
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  if (loading) {
    return <div className="cart-page">⏳ Đang tải giỏ hàng...</div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-page empty">
        <h2>Giỏ hàng trống</h2>
        <Link to="/">Tiếp tục mua sắm</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Giỏ hàng của bạn</h2>
      <div className="cart-list">
        {cartItems.map((item) => (
          <div key={item.cart_item_id} className="cart-item">
            <img src={item.image_url} alt={item.name} />
            <div className="cart-info">
              <h4>{item.name}</h4>
              <p className="price">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(item.price)}
              </p>
              <div className="cart-actions">
                <button onClick={() => handleQtyChange(item.cart_item_id, item.quantity - 1)}>
                  -
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  min={1}
                  onChange={(e) =>
                    handleQtyChange(item.cart_item_id, Number(e.target.value))
                  }
                />
                <button onClick={() => handleQtyChange(item.cart_item_id, item.quantity + 1)}>
                  +
                </button>
                <button className="remove-btn" onClick={() => handleRemove(item.cart_item_id)}>
                  Xóa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>
          Tổng cộng:{" "}
          <span>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(getTotal())}
          </span>
        </h3>
        <Link to="/checkout" className="checkout-btn">
          Thanh toán
        </Link>
      </div>
    </div>
  );
}
