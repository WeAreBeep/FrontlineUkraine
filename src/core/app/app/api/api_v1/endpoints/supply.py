from typing import Any

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from what3words import what3words

from app import views
from app.api import deps
from app.schemas import SupplyCreate

router = APIRouter()


@router.post("", response_model=Any)
def create_supply(
        supply_create: SupplyCreate,
        db: Session = Depends(deps.get_db),
        geocoder: what3words.Geocoder = Depends(deps.get_what3words_geocoder)
) -> Any:
    supplier = views.supply.create_supplier(db, geocoder, request=supply_create)
    return supplier
