export const allProducts = [
    // Thời Trang Nam
    { id: 1, name: "Áo sơ mi nam trắng", price: 199000, image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 1, rating: 4.5, sold: 120 },
    { id: 2, name: "Áo thun nam basic", price: 149000, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 1, rating: 4.3, sold: 85 },
    { id: 3, name: "Quần jean nam", price: 299000, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 1, rating: 4.7, sold: 210 },

    // Thời Trang Nữ
    { id: 4, name: "Đầm dự tiệc", price: 399000, image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 2, rating: 4.8, sold: 156 },
    { id: 5, name: "Áo crop-top", price: 159000, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 2, rating: 4.2, sold: 320 },
    { id: 6, name: "Chân váy ngắn", price: 189000, image: "https://images.unsplash.com/photo-1554232456-8727aae0c584?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 2, rating: 4.4, sold: 189 },

    // Điện Thoại
    { id: 7, name: "iPhone 14 Pro", price: 23990000, image: "https://images.unsplash.com/photo-1675862244864-4d2c6fa14c6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 3, rating: 4.9, sold: 45 },
    { id: 8, name: "Samsung Galaxy S23", price: 19990000, image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 3, rating: 4.7, sold: 78 },
    { id: 9, name: "Xiaomi 13", price: 12990000, image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 3, rating: 4.5, sold: 112 },

    // Máy Tính
    { id: 10, name: "MacBook Pro 14”", price: 48990000, image: "https://images.unsplash.com/photo-1542393545-10f5cde2c810?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 4, rating: 4.8, sold: 32 },
    { id: 11, name: "Dell XPS 13", price: 32990000, image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 4, rating: 4.6, sold: 41 },
    { id: 12, name: "Asus ROG Gaming", price: 25990000, image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 4, rating: 4.7, sold: 67 },

    // Máy Ảnh
    { id: 13, name: "Canon EOS R5", price: 79990000, image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 5, rating: 4.9, sold: 18 },
    { id: 14, name: "Sony A7 IV", price: 62990000, image: "https://images.unsplash.com/photo-1505739998589-00fc191ce01d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 5, rating: 4.8, sold: 24 },
    { id: 15, name: "Fujifilm X-T4", price: 38990000, image: "https://images.unsplash.com/photo-1505739998589-00fc191ce01d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 5, rating: 4.7, sold: 29 },

    // Đồng Hồ
    { id: 16, name: "Casio G-Shock", price: 2990000, image: "https://images.unsplash.com/photo-1539874754764-5a96559165b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 6, rating: 4.6, sold: 156 },
    { id: 17, name: "Rolex Submariner", price: 299990000, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 6, rating: 5.0, sold: 8 },
    { id: 18, name: "Seiko 5", price: 4990000, image: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 6, rating: 4.5, sold: 73 },

    // Giày Dép
    { id: 19, name: "Nike Air Force 1", price: 2990000, image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 7, rating: 4.7, sold: 245 },
    { id: 20, name: "Adidas Ultraboost", price: 3290000, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 7, rating: 4.8, sold: 189 },
    { id: 21, name: "Converse Chuck Taylor", price: 1590000, image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 7, rating: 4.4, sold: 312 },

    // Túi Ví
    { id: 22, name: "Balo da nam", price: 899000, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 8, rating: 4.3, sold: 98 },
    { id: 23, name: "Túi xách nữ thời trang", price: 1299000, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 8, rating: 4.6, sold: 134 },
    { id: 24, name: "Ví da nam", price: 499000, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 8, rating: 4.2, sold: 167 },

    // Phụ Kiện
    { id: 25, name: "Nhẫn bạc nữ", price: 299000, image: "https://images.unsplash.com/photo-1606760227093-3bdfc6a7afc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 9, rating: 4.5, sold: 210 },
    { id: 26, name: "Vòng tay da nam", price: 199000, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 9, rating: 4.1, sold: 145 },
    { id: 27, name: "Khuyên tai đá", price: 159000, image: "https://images.unsplash.com/photo-1606760227093-3bdfc6a7afc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 9, rating: 4.3, sold: 178 },

    // Thể Thao
    { id: 28, name: "Bóng đá FIFA", price: 499000, image: "https://images.unsplash.com/photo-1614632537197-38d4d7ef5b65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 10, rating: 4.4, sold: 87 },
    { id: 29, name: "Giày chạy bộ", price: 1599000, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 10, rating: 4.6, sold: 123 },
    { id: 30, name: "Vợt cầu lông Yonex", price: 899000, image: "https://images.unsplash.com/photo-1622279457486-3a0b213dafc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 10, rating: 4.7, sold: 76 },

    // Mẹ & Bé
    { id: 31, name: "Sữa bột trẻ em", price: 399000, image: "https://images.unsplash.com/photo-1567586813321-c6c0e83c0124?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 11, rating: 4.8, sold: 234 },
    { id: 32, name: "Xe đẩy em bé", price: 2599000, image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 11, rating: 4.5, sold: 43 },
    { id: 33, name: "Bỉm trẻ em", price: 299000, image: "https://images.unsplash.com/photo-1584839404047-5f4d3d3ad281?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 11, rating: 4.6, sold: 312 },

    // Làm Đẹp
    { id: 34, name: "Son môi đỏ", price: 299000, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 12, rating: 4.7, sold: 289 },
    { id: 35, name: "Kem dưỡng da", price: 499000, image: "https://images.unsplash.com/photo-1591370874773-670d30e0c8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 12, rating: 4.5, sold: 156 },
    { id: 36, name: "Nước hoa nữ", price: 1599000, image: "https://images.unsplash.com/photo-1595425970377-2f8ded7c7b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 12, rating: 4.8, sold: 98 },

    // Sách
    { id: 37, name: "Tiểu thuyết", price: 99000, image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 13, rating: 4.4, sold: 187 },
    { id: 38, name: "Sách kỹ năng", price: 159000, image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 13, rating: 4.6, sold: 132 },
    { id: 39, name: "Truyện tranh", price: 89000, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 13, rating: 4.3, sold: 245 },

    // Đồ Gia Dụng
    { id: 40, name: "Máy hút bụi", price: 1999000, image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 14, rating: 4.5, sold: 67 },
    { id: 41, name: "Nồi cơm điện", price: 999000, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 14, rating: 4.7, sold: 134 },
    { id: 42, name: "Quạt điện", price: 599000, image: "https://images.unsplash.com/photo-1563431348640-9b67770caea3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 14, rating: 4.2, sold: 189 },

    // Thực Phẩm
    { id: 43, name: "Táo Mỹ", price: 99000, image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 15, rating: 4.6, sold: 312 },
    { id: 44, name: "Thịt bò Úc", price: 399000, image: "https://images.unsplash.com/photo-1601244201219-cc4471d075e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 15, rating: 4.8, sold: 98 },
    { id: 45, name: "Rau củ sạch", price: 59000, image: "https://images.unsplash.com/photo-1566842600175-97dca3dfc3c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 15, rating: 4.5, sold: 456 },

    // Du Lịch & Vé
    { id: 46, name: "Vé máy bay Hà Nội - Sài Gòn", price: 1599000, image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 16, rating: 4.7, sold: 56 },
    { id: 47, name: "Tour Đà Nẵng 3N2Đ", price: 2999000, image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 16, rating: 4.9, sold: 34 },
    { id: 48, name: "Khách sạn 5*", price: 1999000, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", category: 16, rating: 4.8, sold: 28 }
];

export default allProducts;