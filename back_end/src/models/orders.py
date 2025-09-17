from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Enum, DECIMAL
from sqlalchemy.orm import relationship
from datetime import datetime
from src.utils.db import Base
import enum

class OrderStatus(enum.Enum):
    pending = "pending"
    paid = "paid"
    shipped = "shipped"
    cancelled = "cancelled"

class Order(Base):
    __tablename__ = "orders"

    order_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.user_id"))
    order_date = Column(DateTime, default=datetime.utcnow)
    status = Column(Enum(OrderStatus), default=OrderStatus.pending)
    total_amount = Column(DECIMAL(10,2))

    items = relationship("OrderItem", back_populates="order")


class OrderItem(Base):
    __tablename__ = "order_items"

    order_item_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    order_id = Column(Integer, ForeignKey("orders.order_id"))
    product_id = Column(Integer, ForeignKey("products.product_id"))
    name_product = Column(String(255))
    quantity = Column(Integer, nullable=False)
    price = Column(DECIMAL(10,2), nullable=False)

    order = relationship("Order", back_populates="items")
