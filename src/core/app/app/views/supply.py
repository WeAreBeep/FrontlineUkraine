from sqlalchemy.orm import Session
from what3words import what3words

from app import services
from app.models import Supplier
from app.schemas import SupplyCreate


def create_supplier(db: Session, geocoder: what3words.Geocoder, *, request: SupplyCreate) -> Supplier:
    return services.supply.add_supplier(db, geocoder, request=request)
