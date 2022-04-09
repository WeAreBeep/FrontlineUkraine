from typing import Any

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import views
from app.api import deps
from app.schemas import SupplyCreate

router = APIRouter()


@router.post("", response_model=Any)
def create_supply(
    supply_create: SupplyCreate, db: Session = Depends(deps.get_db)
) -> Any:
    supplier = views.supply.create_supplier(db, request=supply_create)
    return supplier
