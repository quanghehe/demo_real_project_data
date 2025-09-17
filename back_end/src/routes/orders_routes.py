from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.utils.db import get_db
from src.models.orders import Order, OrderItem
from src.schemas.schemas_order import OrderCreate, OrderResponse

router = APIRouter(prefix="/orders", tags=["Orders"])

# Tạo đơn hàng mới
@router.post("/", response_model=OrderResponse)
def create_order(order: OrderCreate, db: Session = Depends(get_db)):
    new_order = Order(
        user_id=order.user_id,
        total_amount=order.total_amount,
        status="pending"
    )
    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    for item in order.items:
        db_item = OrderItem(
            order_id=new_order.order_id,
            product_id=item.product_id,
            name_product=item.name_product,
            quantity=item.quantity,
            price=item.price
        )
        db.add(db_item)

    db.commit()
    db.refresh(new_order)
    return new_order

# Lấy đơn hàng theo id
@router.get("/{order_id}", response_model=OrderResponse)
def get_order(order_id: int, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.order_id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Không tìm thấy đơn hàng")
    return order

# Lấy tất cả đơn hàng của 1 user
@router.get("/user/{user_id}", response_model=list[OrderResponse])
def get_orders_by_user(user_id: int, db: Session = Depends(get_db)):
    return db.query(Order).filter(Order.user_id == user_id).all()
