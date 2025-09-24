
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from typing import  Literal

class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    role: Literal["customer", "admin"] = "customer"
    address: str
    phone_number: str

class UserLogin(BaseModel):
    username: str
    password: str

class UserResponse(BaseModel):
    user_id: int
    username: str
    email: str
    role: str
    address: str
    phone_number: str
    created_at: datetime
    
    class Config:
        from_attributes = True  # Thay vì orm_mode = True
        # Thêm cấu hình này để xử lý datetime
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

class TokenResponse(BaseModel):
    user_id: int
    username: str
    token: str