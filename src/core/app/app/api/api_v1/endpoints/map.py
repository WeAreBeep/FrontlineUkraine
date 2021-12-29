from typing import Any

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import services
from app.api import deps

router = APIRouter()


@router.get("", response_model=Any)
def get_map(db: Session = Depends(deps.get_db)) -> Any:
    result = services.map.get_map_data(db)
    return result
