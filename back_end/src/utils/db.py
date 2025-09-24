from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# Tạo engine
engine = create_engine(DATABASE_URL, echo=True)

# Session local
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base model cho ORM
Base = declarative_base()

# Dependency cho FastAPI (dùng trong routes)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    import src.models  # import tất cả models để SQLAlchemy biết
    Base.metadata.create_all(bind=engine)