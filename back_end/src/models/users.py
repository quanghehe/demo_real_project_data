from sqlalchemy import Column, Integer, String, Enum, TIMESTAMP
from sqlalchemy.sql import func
from src.utils.db import Base

class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    role = Column(Enum("customer", "admin"), default="customer")
    address = Column(String(255), nullable=False)
    phone_number = Column(String(50), nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())
