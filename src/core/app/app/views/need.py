from sqlalchemy.orm import Session

from app import services
from app.models import Need
from app.schemas import NeedCreate


def create_need(db: Session, *, request: NeedCreate) -> Need:
    return services.need.add_need(db, request=request)
