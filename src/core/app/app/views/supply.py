from sqlalchemy.orm import Session

from app import services
from app.models import Supplier
from app.schemas import SupplyCreate


def create_supplier(db: Session, *, request: SupplyCreate) -> Supplier:
    return services.supply.add_supplier(db, request=request)
