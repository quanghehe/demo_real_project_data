from sqlalchemy import Column, Integer, String, Text, DECIMAL, ForeignKey, TIMESTAMP
from sqlalchemy.sql import func
from src.utils.db import Base
from sqlalchemy.orm import relationship

class Product(Base):
    __tablename__ = "products"

    product_id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(200), nullable=False)
    description = Column(Text)
    price = Column(DECIMAL(10, 2), nullable=False)
    stock = Column(Integer, default=0)
    quantity = Column(Integer, default=100)
    category_id = Column(Integer, ForeignKey('categories.category_id'))
    image_url = Column(String(500))
    sold = Column(Integer, default=0)
    created_at = Column(TIMESTAMP, server_default=func.now())

    cart_items = relationship("CartItem", back_populates="product")  # 1 product có nhiều cart_items