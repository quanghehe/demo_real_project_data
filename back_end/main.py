from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # ← Thêm import này
from src.routes import product_routes
from src.routes import users_routes
from src.routes import orders_routes
from src.routes import carts_routes
from src.routes import events_routes
from src.middlewares.error_handler import register_error_handlers
from src.utils.db import init_db

app = FastAPI(title="My Shop API")

# ========== THÊM CORS MIDDLEWARE ==========
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",      # React default port
        "http://127.0.0.1:3000",
        "http://localhost:5173",      # Vite default port
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)
# ==========================================

# Khởi tạo database
init_db()

# Gắn routes
app.include_router(users_routes.router, prefix="/api")
app.include_router(product_routes.router)
app.include_router(orders_routes.router)
app.include_router(carts_routes.router)
app.include_router(events_routes.router)

# Error handler
register_error_handlers(app)

@app.get("/")
def read_root():
    return {"message": "Backend is running 🚀"}

# Thêm health check endpoint
@app.get("/health")
def health_check():
    return {"status": "OK", "cors": "enabled"}

if __name__ == "__main__":
    import uvicorn
    # Thay đổi từ:
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
    
    # Thành:
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)