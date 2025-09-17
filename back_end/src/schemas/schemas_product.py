from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional

class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    stock: int = 0
    quantity: int = 100
    category_id: Optional[int] = None
    image_url: Optional[str] = None
    sold: int = 0

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    product_id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
