import './App.css';
import Navbar from './Compoments/Navbar/Navbar.jsx';
import Home from './Pages/Home/Home.jsx';
import ProductList from './Pages/Product_list/ProductList.jsx';
import ProductDetail from './Pages/Product_detail/ProductDetail.jsx';
import Cart from './Pages/Cart/Cart.jsx';
import Checkout from './Pages/Checkout/Checkout.jsx';

import { AuthProvider } from './Context/AuthContext.js';
import Login from './Pages/Login/Login.jsx';
import Register from './Pages/Register/Register.jsx'
import Profile from './Pages/Profile/Profile.jsx';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    // Bọc toàn bộ ứng dụng trong AuthProvider
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryId" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>

        <ToastContainer position="top-right" autoClose={2000} />
      </Router>
    </AuthProvider>
  );
}

export default App;