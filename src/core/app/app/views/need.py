from what3words import what3words
from sqlalchemy.orm import Session

from app import services
from app.models import Need
from app.schemas import NeedCreate


def create_need(db: Session, geocoder: what3words.Geocoder, *, request: NeedCreate) -> Need:
    return services.need.add_need(db, geocoder, request=request)
