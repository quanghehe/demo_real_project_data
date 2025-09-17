import React, { useState, useEffect } from 'react';
import './Home.css';
import { Link } from "react-router-dom";

const Homepage = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [flashSaleTime, setFlashSaleTime] = useState({ hours: 2, minutes: 30, seconds: 45 });

  // Banner data
  const banners = [
    {
      id: 1,
      image: "https://images.unsplash.com/vector-1750437268162-1b4aebf030e9?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Flash Sale 12.12",
      subtitle: "Giảm đến 80% - Miễn phí ship"
    },
    {
      id: 2,
      image: "https://plus.unsplash.com/premium_photo-1661551269670-b13b4944907a?q=80&w=2854&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Xu hướng thời trang",
      subtitle: "Bộ sưu tập mới nhất 2024"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1592839930500-3445eb72b8ad?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Điện tử - Công nghệ",
      subtitle: "Voucher 500K cho đơn từ 2 triệu"
    }
  ];

  // Categories data
  const categories = [
    { id: 1, name: 'Thời Trang Nam', icon: '👔', color: '#ff6b6b' },
    { id: 2, name: 'Thời Trang Nữ', icon: '👗', color: '#4ecdc4' },
    { id: 3, name: 'Điện Thoại', icon: '📱', color: '#45b7d1' },
    { id: 4, name: 'Máy Tính', icon: '💻', color: '#96ceb4' },
    { id: 5, name: 'Máy Ảnh', icon: '📷', color: '#feca57' },
    { id: 6, name: 'Đồng Hồ', icon: '⌚', color: '#ff9ff3' },
    { id: 7, name: 'Giày Dép', icon: '👟', color: '#54a0ff' },
    { id: 8, name: 'Túi Ví', icon: '👜', color: '#5f27cd' },
    { id: 9, name: 'Phụ Kiện', icon: '💎', color: '#00d2d3' },
    { id: 10, name: 'Thể Thao', icon: '⚽', color: '#ff6348' },
    { id: 11, name: 'Mẹ & Bé', icon: '🍼', color: '#ffb347' },
    { id: 12, name: 'Làm Đẹp', icon: '💄', color: '#e84393' },
    { id: 13, name: 'Sách', icon: '📚', color: '#6c5ce7' },
    { id: 14, name: 'Đồ Gia Dụng', icon: '🏠', color: '#00cec9' },
    { id: 15, name: 'Thực Phẩm', icon: '🥦', color: '#55efc4' },
    { id: 16, name: 'Du Lịch & Vé', icon: '✈️', color: '#fd79a8' }
  ];


  // Flash sale products
  const flashSaleProducts = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max 256GB',
      originalPrice: 34990000,
      salePrice: 29990000,
      image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300&h=300&fit=crop',
      sold: 89,
      stock: 100,
      discount: 14
    },
    {
      id: 2,
      name: 'Áo Thun Nam Basic Tee',
      originalPrice: 299000,
      salePrice: 199000,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
      sold: 156,
      stock: 200,
      discount: 33
    },
    {
      id: 3,
      name: 'Giày Sneaker Nam Nữ',
      originalPrice: 1299000,
      salePrice: 899000,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop',
      sold: 234,
      stock: 300,
      discount: 31
    },
    {
      id: 4,
      name: 'Túi Xách Nữ Cao Cấp',
      originalPrice: 2499000,
      salePrice: 1799000,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
      sold: 67,
      stock: 150,
      discount: 28
    },
    {
      id: 5,
      name: 'Tai Nghe Bluetooth AirPods',
      originalPrice: 4999000,
      salePrice: 3999000,
      image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=300&h=300&fit=crop',
      sold: 123,
      stock: 180,
      discount: 20
    }
  ];

  // Suggested products
  const suggestedProducts = [
    {
      id: 6,
      name: 'Đầm Maxi Nữ Dạo Phố',
      price: 459000,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=300&fit=crop',
      rating: 4.8,
      sold: 2300,
      location: 'TP. HCM'
    },
    {
      id: 7,
      name: 'Quần Jeans Nam Slim Fit',
      price: 389000,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop',
      rating: 4.6,
      sold: 1850,
      location: 'Hà Nội'
    },
    {
      id: 8,
      name: 'Laptop Gaming ROG Strix',
      price: 25999000,
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300&h=300&fit=crop',
      rating: 4.9,
      sold: 456,
      location: 'Đà Nẵng'
    },
    {
      id: 9,
      name: 'Đồng Hồ Thông Minh Apple',
      price: 8999000,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
      rating: 4.7,
      sold: 892,
      location: 'TP. HCM'
    },
    {
      id: 10,
      name: 'Balo Laptop Cao Cấp',
      price: 599000,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
      rating: 4.5,
      sold: 1234,
      location: 'Hà Nội'
    },
    {
      id: 11,
      name: 'Kem Chống Nắng SPF 50+',
      price: 259000,
      image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=300&h=300&fit=crop',
      rating: 4.8,
      sold: 3456,
      location: 'TP. HCM'
    },
    {
      id: 12,
      name: 'Set Mỹ Phẩm Dưỡng Da',
      price: 1299000,
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop',
      rating: 4.9,
      sold: 567,
      location: 'Đà Nẵng'
    },
    {
      id: 13,
      name: 'Nồi Cơm Điện Cao Tần',
      price: 2199000,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop',
      rating: 4.6,
      sold: 789,
      location: 'TP. HCM'
    }
  ];

  // Auto slide banner
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  },);

  // Flash sale countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setFlashSaleTime(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  },);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <div className="homepage">
      {/* Hero Banner Section */}
      <section className="hero-section">
        <div className="banner-container">
          <div className="main-banner">
            <div className="banner-slider">
              {banners.map((banner, index) => (
                <div
                  key={banner.id}
                  className={`banner-slide ${index === currentBanner ? 'active' : ''}`}
                  style={{ backgroundImage: `url(${banner.image})` }}
                >
                  <div className="banner-content">
                    <h2>{banner.title}</h2>
                    <p>{banner.subtitle}</p>
                    <button className="banner-btn">Mua Ngay</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="banner-dots">
              {banners.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentBanner ? 'active' : ''}`}
                  onClick={() => setCurrentBanner(index)}
                />
              ))}
            </div>
          </div>

          <div className="side-banners">
            <div className="side-banner">
              <img src="https://plus.unsplash.com/premium_vector-1721224451066-69e3dbc9d56b?q=80&w=1180&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Promo 1" />
              <div className="side-banner-content">
                <h4>Freeship 0Đ</h4>
                <p>Đơn từ 150K</p>
              </div>
            </div>
            <div className="side-banner">
              <img src="https://plus.unsplash.com/premium_vector-1730845302652-a7e6108be72e?q=80&w=1180&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Promo 2" />
              <div className="side-banner-content">
                <h4>Voucher 500K</h4>
                <p>Cho thành viên mới</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2>Danh Mục</h2>
          <div className="categories-grid">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="category-item"
              >
                <div className="category-icon" style={{ backgroundColor: category.color }}>
                  <span>{category.icon}</span>
                </div>
                <span className="category-name">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Sale Section */}
      <section className="flash-sale-section">
        <div className="container">
          <div className="flash-sale-header">
            <div className="flash-sale-title">
              <span className="flash-icon">⚡</span>
              <h2>FLASH SALE</h2>
              <div className="countdown">
                <span>{String(flashSaleTime.hours).padStart(2, '0')}</span>
                <span>:</span>
                <span>{String(flashSaleTime.minutes).padStart(2, '0')}</span>
                <span>:</span>
                <span>{String(flashSaleTime.seconds).padStart(2, '0')}</span>
              </div>
            </div>
            <button className="view-all-btn">Xem Tất Cả</button>
          </div>

          <div className="flash-sale-products">
            {flashSaleProducts.map((product) => (
              <div key={product.id} className="flash-sale-item">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <span className="discount-badge">{product.discount}%</span>
                </div>
                <div className="product-info">
                  <h4>{product.name}</h4>
                  <div className="product-prices">
                    <span className="sale-price">{formatPrice(product.salePrice)}</span>
                    <span className="original-price">{formatPrice(product.originalPrice)}</span>
                  </div>
                  <div className="product-progress">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${(product.sold / product.stock) * 100}%` }}
                      ></div>
                    </div>
                    <span className="sold-text">Đã bán {product.sold}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Suggested Products Section */}
      <section className="suggested-section">
        <div className="container">
          <h2>GỢI Ý HÔM NAY</h2>
          <div className="suggested-products">
            {suggestedProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <div className="product-overlay">
                    <button className="quick-view-btn">Xem Nhanh</button>
                  </div>
                </div>
                <div className="product-info">
                  <h4>{product.name}</h4>
                  <div className="product-price">
                    <span className="current-price">{formatPrice(product.price)}</span>
                  </div>
                  <div className="product-meta">
                    <div className="rating">
                      <span className="stars">⭐⭐⭐⭐⭐</span>
                      <span className="rating-score">({product.rating})</span>
                    </div>
                    <span className="sold">Đã bán {formatNumber(product.sold)}</span>
                  </div>
                  <div className="product-location">
                    <span>📍 {product.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="load-more">
            <button className="load-more-btn">Xem Thêm Sản Phẩm</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;