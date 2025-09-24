# src/models/events.py
from sqlalchemy import Column, BigInteger, Integer, String, Text, DateTime
from sqlalchemy.dialects.mysql import JSON as MYSQL_JSON
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql import func

Base = declarative_base()

class Event(Base):
    __tablename__ = "events"
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    received_at = Column(DateTime, server_default=func.now())
    event_time = Column(DateTime, nullable=True)
    event_type = Column(String(50), nullable=False)
    user_id = Column(Integer, nullable=True)
    anon_id = Column(String(64), nullable=True)
    session_id = Column(String(64), nullable=True)
    page_url = Column(Text, nullable=True)
    referrer = Column(Text, nullable=True)
    user_agent = Column(Text, nullable=True)
    props = Column(MYSQL_JSON)
