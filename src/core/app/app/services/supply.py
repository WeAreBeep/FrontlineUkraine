from sqlalchemy.orm import Session

from app import crud
from app.models import Supplier
from app.schemas import SupplyCreate


def add_supplier(db: Session, *, request: SupplyCreate) -> Supplier:
    return crud.supplier.create_from_request(db, request=request)
