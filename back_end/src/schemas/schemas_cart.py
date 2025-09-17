from pydantic import BaseModel
from typing import List, Optional


# CartItem Schema
class CartItemBase(BaseModel):
    product_id: int
    quantity: int


class CartItemCreate(CartItemBase):
    """Schema khi client gửi request thêm/cập nhật item"""
    pass


class CartItemResponse(CartItemBase):
    cart_item_id: int
    name: str
    price: float
    image_url: Optional[str] = None  # có thể null nếu sp không có ảnh

    class Config:
        orm_mode = True


# Cart Schema
class CartBase(BaseModel):
    user_id: int


class CartCreate(CartBase):
    """Schema khi tạo cart (ít dùng vì cart auto tạo khi thêm item)"""
    pass


class CartResponse(CartBase):
    cart_id: int
    items: List[CartItemResponse] = []

    class Config:
        orm_mode = True
