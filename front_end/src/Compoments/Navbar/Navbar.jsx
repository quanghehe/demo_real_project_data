import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

// Import AuthContext để lấy user
import { AuthContext } from '../../Context/AuthContext.js';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [cartCount, setCartCount] = useState(0);

  const { user } = useContext(AuthContext);

  // base URL backend
  const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8000";

  // Lắng nghe scroll để đổi style navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lấy số lượng giỏ hàng từ API
  useEffect(() => {
    if (!user) {
      setCartCount(0);
      return;
    }

    const fetchCart = async () => {
      try {
        const res = await fetch(`${API_BASE}/cart/${user.user_id}`);
        if (res.ok) {
          const data = await res.json();
          // tính tổng quantity
          const total = data.items?.reduce((sum, it) => sum + it.quantity, 0) || 0;
          setCartCount(total);
        }
      } catch (err) {
        console.error("Lỗi fetch cart:", err);
      }
    };

    fetchCart();

    // Lắng nghe sự kiện "cartUpdated" từ ProductDetail
    const handler = () => fetchCart();
    window.addEventListener("cartUpdated", handler);

    return () => window.removeEventListener("cartUpdated", handler);
  }, [user, API_BASE]);

  const handleCartClick = () => {
    setCartBounce(true);
    setTimeout(() => setCartBounce(false), 600);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search:', searchValue);
  };

  return (
    <div className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      {/* Background Effects */}
      <div className="bg-effects">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      {/* Logo → click về trang chủ */}
      <Link to="/" className="nav_logo">
        <div className="logo-container">
          <div className="logo-placeholder">
            <div className="logo-icon">🛍️</div>
          </div>
          <div className="logo-text">
            <span className="shop">Shop</span>
            <span className="x">QQ</span>
          </div>
        </div>
      </Link>

      {/* Search */}
      <div className={`nav_search ${searchFocused ? 'focused' : ''}`}>
        <form className="search-container" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <button type="submit" className="search_btn">
            <span className="search-icon">🔍</span>
          </button>
          <div className="search-glow"></div>
        </form>
      </div>

      {/* Actions */}
      <div className="nav_actions">
        {user ? (
          <Link to="/profile" className="login_btn">
            <span className="btn-text">{user.username}</span>
            <div className="btn-glow"></div>
          </Link>
        ) : (
          <Link to="/login" className="login_btn">
            <span className="btn-text">Đăng nhập</span>
            <div className="btn-glow"></div>
          </Link>
        )}

        {/* Giỏ hàng */}
        <Link
          to="/cart"
          className={`cart_wrapper ${cartBounce ? 'bounce' : ''}`}
          onClick={handleCartClick}
        >
          <div className="cart-container">
            <div className="cart-icon">🛒</div>
            {cartCount > 0 && <span className="cart_count">{cartCount}</span>}
            <div className="cart-pulse"></div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
