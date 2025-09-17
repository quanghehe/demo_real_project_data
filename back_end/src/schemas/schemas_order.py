from pydantic import BaseModel
from typing import List
from datetime import datetime

class OrderItemBase(BaseModel):
    product_id: int
    name_product: str
    quantity: int
    price: float

class OrderItemCreate(OrderItemBase):
    pass

class OrderItemResponse(OrderItemBase):
    order_item_id: int
    class Config:
        orm_mode = True


class OrderBase(BaseModel):
    user_id: int
    total_amount: float

class OrderCreate(OrderBase):
    items: List[OrderItemCreate]

class OrderResponse(OrderBase):
    order_id: int
    order_date: datetime
    status: str
    items: List[OrderItemResponse] = []

    class Config:
        orm_mode = True
