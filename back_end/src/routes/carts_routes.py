from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.utils.db import get_db
from src.models.carts import Cart, CartItem
from src.models.products import Product
from src.schemas.schemas_cart import CartResponse, CartItemCreate

router = APIRouter(prefix="/cart", tags=["Cart"])


# 🔹 Hàm tiện ích: format cart + join Product
def build_cart_response(cart: Cart, db: Session):
    try:
        items = (
            db.query(CartItem, Product)
            .join(Product, CartItem.product_id == Product.product_id)
            .filter(CartItem.cart_id == cart.cart_id)
            .all()
        )

        cart_items = [
            {
                "cart_item_id": ci.cart_item_id,
                "product_id": ci.product_id,
                "quantity": ci.quantity,
                "name": p.name,
                "price": float(p.price),   # DECIMAL cần ép float để JSON serialize được
                "image_url": p.image_url,
                "stock": p.stock,
                "sold": p.sold,
            }
            for ci, p in items
        ]

        return {
            "user_id": cart.user_id,
            "cart_id": cart.cart_id,
            "items": cart_items,
        }
    except Exception as e:
        import traceback
        print("❌ ERROR in build_cart_response:", e)
        traceback.print_exc()
        db.rollback()
        raise HTTPException(status_code=500, detail="Error building cart response")


# 🟢 Get cart by user_id
@router.get("/{user_id}", response_model=CartResponse)
def get_cart(user_id: int, db: Session = Depends(get_db)):
    cart = db.query(Cart).filter(Cart.user_id == user_id).first()
    if not cart:
        cart = Cart(user_id=user_id)
        db.add(cart)
        db.commit()
        db.refresh(cart)

    return build_cart_response(cart, db)


# 🟢 Add product to cart (sửa lại để không bị trùng)
@router.post("/{user_id}/items", response_model=CartResponse)
def add_item(user_id: int, item: CartItemCreate, db: Session = Depends(get_db)):
    cart = db.query(Cart).filter(Cart.user_id == user_id).first()
    if not cart:
        cart = Cart(user_id=user_id)
        db.add(cart)
        db.commit()
        db.refresh(cart)

    product = db.query(Product).filter(Product.product_id == item.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    # ✅ Kiểm tra sản phẩm đã tồn tại trong giỏ chưa
    cart_item = (
        db.query(CartItem)
        .filter(CartItem.cart_id == cart.cart_id, CartItem.product_id == item.product_id)
        .first()
    )

    if cart_item:
        # Nếu đã có thì cộng dồn số lượng
        cart_item.quantity += item.quantity
    else:
        # Nếu chưa có thì thêm mới
        cart_item = CartItem(
            cart_id=cart.cart_id,
            product_id=item.product_id,
            quantity=item.quantity,
        )
        db.add(cart_item)

    db.commit()
    db.refresh(cart)
    return build_cart_response(cart, db)


# 🟢 Update quantity of an item
@router.put("/{user_id}/items/{item_id}", response_model=CartResponse)
def update_item(user_id: int, item_id: int, item: CartItemCreate, db: Session = Depends(get_db)):
    cart = db.query(Cart).filter(Cart.user_id == user_id).first()
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")

    cart_item = (
        db.query(CartItem)
        .filter(CartItem.cart_item_id == item_id, CartItem.cart_id == cart.cart_id)
        .first()
    )
    if not cart_item:
        raise HTTPException(status_code=404, detail="Item not found")

    cart_item.quantity = item.quantity
    db.commit()
    db.refresh(cart)
    return build_cart_response(cart, db)


# 🟢 Delete item from cart
@router.delete("/{user_id}/items/{item_id}", response_model=CartResponse)
def delete_item(user_id: int, item_id: int, db: Session = Depends(get_db)):
    cart = db.query(Cart).filter(Cart.user_id == user_id).first()
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")

    cart_item = (
        db.query(CartItem)
        .filter(CartItem.cart_item_id == item_id, CartItem.cart_id == cart.cart_id)
        .first()
    )
    if not cart_item:
        raise HTTPException(status_code=404, detail="Item not found")

    db.delete(cart_item)
    db.commit()
    db.refresh(cart)
    return build_cart_response(cart, db)


# 🟢 Clear cart
@router.delete("/{user_id}", response_model=CartResponse)
def clear_cart(user_id: int, db: Session = Depends(get_db)):
    cart = db.query(Cart).filter(Cart.user_id == user_id).first()
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")

    db.query(CartItem).filter(CartItem.cart_id == cart.cart_id).delete()
    db.commit()
    db.refresh(cart)
    return build_cart_response(cart, db)
