from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from src.utils.db import Base

class Cart(Base):
    __tablename__ = "carts"

    cart_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), unique=True, nullable=False)

    # Quan hệ 1-n: 1 cart có nhiều cart_items
    items = relationship("CartItem", back_populates="cart", cascade="all, delete-orphan")


class CartItem(Base):
    __tablename__ = "cart_items"

    cart_item_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    cart_id = Column(Integer, ForeignKey("carts.cart_id"))
    product_id = Column(Integer, ForeignKey("products.product_id"))
    quantity = Column(Integer, nullable=False)

    # Quan hệ ngược
    cart = relationship("Cart", back_populates="items")
    product = relationship("Product")  # để join lấy thông tin sản phẩm
