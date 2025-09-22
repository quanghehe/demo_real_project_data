from faker import Faker
import random
from datetime import datetime, timedelta

fake = Faker("vi_VN")  # bạn có thể đổi "vi_VN" để tạo tên/địa chỉ tiếng Việt

# ----- USERS -----
def seed_users(n=10):
    users = []
    for i in range(n):
        users.append({
            "user_id": i + 1,
            "name": fake.name(),
            "email": fake.unique.email(),
            "phone": fake.phone_number(),
            "address": fake.address(),
            "created_at": fake.date_time_between(start_date="-1y", end_date="now"),
        })
    return users


# ----- PRODUCTS -----
def seed_products(n=10):
    products = []
    for i in range(n):
        products.append({
            "product_id": i + 1,
            "name": fake.word().capitalize(),
            "price": round(random.uniform(50_000, 2_000_000), -3),  # giá VND
            "stock": random.randint(0, 500),
            "created_at": fake.date_time_between(start_date="-6m", end_date="now"),
        })
    return products


# ----- CARTS & CART_ITEMS -----
def seed_carts(users, products):
    carts = []
    cart_items = []
    for user in users:
        if random.random() < 0.7:  # 70% user có giỏ hàng
            cart_id = len(carts) + 1
            carts.append({
                "cart_id": cart_id,
                "user_id": user["user_id"],
                "created_at": datetime.now(),
            })
            # thêm vài sản phẩm vào giỏ
            for _ in range(random.randint(1, 4)):
                product = random.choice(products)
                cart_items.append({
                    "cart_item_id": len(cart_items) + 1,
                    "cart_id": cart_id,
                    "product_id": product["product_id"],
                    "quantity": random.randint(1, 3),
                    "created_at": datetime.now(),
                })
    return carts, cart_items


# ----- ORDERS & ORDER_ITEMS -----
def seed_orders(users, products):
    orders = []
    order_items = []
    for _ in range(20):  # tạo 20 đơn hàng
        user = random.choice(users)
        order_id = len(orders) + 1
        order_date = fake.date_time_between(start_date="-6m", end_date="now")

        orders.append({
            "order_id": order_id,
            "user_id": user["user_id"],
            "status": random.choice(["paid", "shipped", "cancelled"]),
            "created_at": order_date,
        })

        # mỗi order có 1-5 sản phẩm
        for _ in range(random.randint(1, 5)):
            product = random.choice(products)
            qty = random.randint(1, 3)
            order_items.append({
                "order_item_id": len(order_items) + 1,
                "order_id": order_id,
                "product_id": product["product_id"],
                "quantity": qty,
                "price": product["price"],
            })

    return orders, order_items


# ----- RUN SEED -----
if __name__ == "__main__":
    users = seed_users(10)
    products = seed_products(10)
    carts, cart_items = seed_carts(users, products)
    orders, order_items = seed_orders(users, products)

    print("USERS:", users[:2])
    print("PRODUCTS:", products[:2])
    print("CARTS:", carts[:2])
    print("CART_ITEMS:", cart_items[:2])
    print("ORDERS:", orders[:2])
    print("ORDER_ITEMS:", order_items[:2])
