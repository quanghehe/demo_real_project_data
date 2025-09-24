import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { FaEnvelope, FaUserShield, FaMapMarkerAlt, FaPhoneAlt, FaCalendarAlt } from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
  const { user, logout } = useContext(AuthContext); 
  const [profile, setProfile] = useState(null);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("storage"));
  };

  useEffect(() => {
    if (user && user.user_id) {
      fetch(`http://127.0.0.1:8000/api/users/${user.user_id}`)
        .then((res) => res.json())
        .then((data) => setProfile(data))
        .catch((err) => console.error("Error:", err));
    }
  }, [user]);

  // ✅ Các return phải để ở đây, ngoài useEffect
  if (!user) {
    return (
      <div className="profile-container">
        <h2>Bạn chưa đăng nhập</h2>
        <p>Vui lòng đăng nhập để xem thông tin tài khoản.</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile-container">
        <p className="loading">Đang tải thông tin cá nhân...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h2>Chào mừng, {profile.username}!</h2>

      <div className="profile-card">
        <FaEnvelope className="profile-icon" />
        <div className="profile-info">
          <p><b>Email:</b> {profile.email}</p>
        </div>
      </div>

      <div className="profile-card">
        <FaUserShield className="profile-icon" />
        <div className="profile-info">
          <p><b>Role:</b> {profile.role}</p>
        </div>
      </div>

      <div className="profile-card">
        <FaMapMarkerAlt className="profile-icon" />
        <div className="profile-info">
          <p><b>Địa chỉ:</b> {profile.address}</p>
        </div>
      </div>

      <div className="profile-card">
        <FaPhoneAlt className="profile-icon" />
        <div className="profile-info">
          <p><b>Số điện thoại:</b> {profile.phone_number}</p>
        </div>
      </div>

      <div className="profile-card">
        <FaCalendarAlt className="profile-icon" />
        <div className="profile-info">
          <p><b>Ngày tạo:</b> {new Date(profile.created_at).toLocaleString()}</p>
        </div>
      </div>

      {/* ✅ gọi handleLogout thay vì logout trực tiếp */}
      <button onClick={handleLogout} className="logout-btn">Đăng xuất</button>
    </div>
  );
};

export default Profile;
