import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./ProductList.css";

// API base URL - thay đổi thành URL của bạn
const API_BASE = "http://localhost:8000";

const ProductList = () => {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [sortOption, setSortOption] = useState("popular");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Lọc sản phẩm theo categoryId từ backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                let url = `${API_BASE}/products/`;
                
                // Nếu có categoryId, thêm tham số filter (tuỳ thuộc vào API của bạn)
                if (categoryId) {
                    url += `?category_id=${categoryId}`;
                }
                
                const response = await fetch(url);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching products:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryId]);

    // Hàm format giá
    const formatPrice = (price) =>
        new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

    // Hàm sort sản phẩm
    const sortedProducts = [...products].sort((a, b) => {
        if (sortOption === "price") return a.price - b.price;
        if (sortOption === "new") return b.product_id - a.product_id;
        return (b.sold || 0) - (a.sold || 0); // popular
    });

    if (loading) {
        return (
            <div className="product-list-page">
                <div className="container">
                    <div className="loading">Đang tải sản phẩm...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="product-list-page">
                <div className="container">
                    <div className="error">Lỗi khi tải sản phẩm: {error}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="product-list-page">
            <div className="container">
                <h2>Danh mục: {categoryId || "Tất cả sản phẩm"}</h2>

                {/* Filter bar */}
                <div className="filter-bar">
                    <span>Sắp xếp:</span>
                    <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                        <option value="popular">Phổ biến</option>
                        <option value="new">Mới nhất</option>
                        <option value="price">Giá tăng dần</option>
                    </select>
                </div>

                {/* Grid sản phẩm */}
                <div className="products-grid">
                    {sortedProducts.map((p) => (
                        <Link to={`/product/${p.product_id}`} key={p.product_id} className="product-card">
                            {/* Thay thế bằng trường hình ảnh thực tế từ API */}
                            <img src={p.image_url || "/placeholder-product.jpg"} alt={p.name} />
                            <h4>{p.name}</h4>
                            <p className="price">{formatPrice(p.price)}</p>
                            <div className="meta">
                                <span>⭐ {p.rating || "5.0"}</span>
                                <span>Đã bán {p.sold || 0}</span>
                            </div>
                        </Link>
                    ))}
                    {sortedProducts.length === 0 && <p>Không có sản phẩm nào trong danh mục này.</p>}
                </div>
            </div>
        </div>
    );
};

export default ProductList;