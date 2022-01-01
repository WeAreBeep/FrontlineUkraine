from sqlalchemy.orm import Session

from app import crud
from app.models import Need
from app.schemas import NeedCreate


def add_need(db: Session, *, request: NeedCreate) -> Need:
    return crud.need.create_from_request(db, request=request)
