import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./ProductDetail.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [qty, setQty] = useState(1);
  const [showImage, setShowImage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8000";

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_BASE}/products/${id}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        if (!mounted) return;

        const p = {
          id: data.product_id,
          name: data.name,
          description: data.description,
          price: Number(data.price),
          originalPrice: data.original_price ?? null,
          stock: data.stock ?? 0,
          sold: data.sold ?? 0,
          rating: data.rating ?? null,
          image: data.image_url ?? "",
          category: data.category_id,
        };

        setProduct(p);

        // gọi thêm API sản phẩm liên quan
        if (p.category) {
          const relRes = await fetch(`${API_BASE}/products?category_id=${p.category}&limit=4`);
          if (relRes.ok) {
            const list = await relRes.json();
            const rel = list
              .filter((it) => it.product_id !== p.id)
              .map((it) => ({
                id: it.product_id,
                name: it.name,
                price: Number(it.price),
                image: it.image_url ?? "",
              }));
            setRelated(rel);
          }
        }
      } catch (err) {
        if (mounted) setError("Không tìm thấy sản phẩm.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProduct();
    return () => {
      mounted = false;
    };
  }, [id, API_BASE]);

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

  if (loading) return <div className="pd-loading">Đang tải...</div>;
  if (error)
    return (
      <div className="pd-notfound">
        <h2>{error}</h2>
        <p>ID: {id}</p>
      </div>
    );
  if (!product) return null;

  // ✅ Hàm thêm giỏ hàng (API thay vì localStorage)
  const handleAddToCart = async () => {
    if ((product.stock ?? 0) <= 0) {
      toast.error("Sản phẩm đã hết hàng");
      return;
    }

    try {
      const userRaw = localStorage.getItem("user");
      if (!userRaw) {
        toast.error("Bạn cần đăng nhập để thêm vào giỏ");
        navigate("/login");
        return;
      }
      const user = JSON.parse(userRaw);

      const res = await fetch(`${API_BASE}/cart/${user.user_id}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: product.id,
          quantity: qty,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      res.json();

      // Trigger event để header/cart badge cập nhật
      window.dispatchEvent(new Event("cartUpdated"));

      toast.success(`${product.name} (${qty}) đã được thêm vào giỏ hàng 🛒`);
    } catch (err) {
      console.error("Add to cart error:", err);
      toast.error("Lỗi khi thêm vào giỏ");
    }
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    navigate("/cart");
  };

  return (
    <div className="pd-container">
      {showImage && (
        <div className="pd-image-modal" onClick={() => setShowImage(false)}>
          <img src={product.image} alt={product.name} />
        </div>
      )}

      <div className="pd-left">
        <img
          src={product.image}
          alt={product.name}
          className="pd-main-image"
          onClick={() => setShowImage(true)}
        />
      </div>

      <div className="pd-right">
        <h1 className="pd-title">{product.name}</h1>

        <div className="pd-meta">
          <div>⭐ {product.rating ?? "-"}</div>
          <div>•</div>
          <div>Đã bán: {product.sold ?? 0}</div>
          <div>•</div>
          <div>Mã SP: {product.id}</div>
        </div>

        <div className="pd-price-row">
          <div className="pd-sale">{formatPrice(product.price)}</div>
          {product.originalPrice && (
            <div className="pd-original">{formatPrice(product.originalPrice)}</div>
          )}
        </div>

        <div className="pd-stock">
          Tình trạng: <strong>{(product.stock ?? 0) > 0 ? "Còn hàng" : "Hết hàng"}</strong>
        </div>

        <div className="pd-qty-row">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))}>-</button>
          <input
            type="number"
            value={qty}
            min={1}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
          />
          <button onClick={() => setQty((q) => q + 1)}>+</button>
          <div className="pd-max">Số lượng tối đa: {product.stock ?? 99}</div>
        </div>

        <div className="pd-actions">
          <button
            className="pd-add"
            onClick={handleAddToCart}
            disabled={(product.stock ?? 0) <= 0}
          >
            Thêm vào giỏ
          </button>
          <button
            className="pd-buy"
            onClick={handleBuyNow}
            disabled={(product.stock ?? 0) <= 0}
          >
            Mua ngay
          </button>
        </div>

        <div className="pd-description">
          <h3>📖 Mô tả sản phẩm</h3>
          <p>{product.description ?? "—"}</p>
        </div>
      </div>

      {related.length > 0 && (
        <div className="pd-related">
          <h3>Sản phẩm liên quan</h3>
          <div className="pd-related-grid">
            {related.map((r) => (
              <Link to={`/products/${r.id}`} key={r.id} className="pd-related-card">
                <img src={r.image} alt={r.name} />
                <div className="pd-related-name">{r.name}</div>
                <div className="pd-related-price">{formatPrice(r.price)}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
