from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.utils.db import get_db
from src.models.users import User
from src.schemas.schemas_user import UserCreate, UserResponse, UserLogin, TokenResponse
from src.utils.auth import hash_password, verify_password, create_access_token

router = APIRouter(prefix="/users", tags=["Users"])

# Đăng ký user
@router.post("/", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already exists")

    hashed_pw = hash_password(user.password)
    new_user = User(
        username=user.username,
        email=user.email,
        password=hashed_pw,
        phone_number=user.phone_number,
        address=user.address,
        role=user.role,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

# Đăng nhập
@router.post("/login", response_model=TokenResponse)
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()
    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid username or password")

    token = create_access_token(data={"sub": str(db_user.user_id)})
    return {
        "user_id": db_user.user_id,
        "username": db_user.username,
        "token": token
    }

# THÊM ROUTE NÀY - Lấy thông tin user theo ID
@router.get("/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# # BONUS: Thêm route lấy thông tin user hiện tại (dùng token)
# from src.utils.auth import get_current_user

# @router.get("/me/profile", response_model=UserResponse)
# def get_current_user_profile(current_user: User = Depends(get_current_user)):
#     return current_user