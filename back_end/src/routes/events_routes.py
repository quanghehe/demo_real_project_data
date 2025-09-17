
from fastapi import APIRouter, Request, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from datetime import datetime
import json

from src.utils.db import get_db
from src.models.events import Event

router = APIRouter(prefix="/events", tags=["Events"])

class EventIn(BaseModel):
    event_type: str
    event_time: str | None = None
    user_id: int | None = None
    anon_id: str | None = None
    session_id: str | None = None
    page_url: str | None = None
    referrer: str | None = None
    user_agent: str | None = None
    props: dict = {}

@router.post("/")
def create_event(evt: EventIn, request: Request, db: Session = Depends(get_db)):
    et = None
    if evt.event_time:
        et = datetime.fromisoformat(evt.event_time.replace("Z","+00:00"))
    ev = Event(
        event_time=et,
        event_type=evt.event_type,
        user_id=evt.user_id,
        anon_id=evt.anon_id,
        session_id=evt.session_id,
        page_url=evt.page_url,
        referrer=evt.referrer,
        user_agent=evt.user_agent,
        props=evt.props
    )
    db.add(ev); db.commit()
    return {"status":"ok"}
