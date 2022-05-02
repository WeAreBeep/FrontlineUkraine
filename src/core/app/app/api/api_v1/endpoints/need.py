from typing import Any

import what3words
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import views
from app.api import deps
from app.schemas import NeedCreate

router = APIRouter()


@router.post("", response_model=Any)
def create_need(need_create: NeedCreate,
                db: Session = Depends(deps.get_db),
                geocoder: what3words.Geocoder = Depends(deps.get_what3words_geocoder)) -> Any:
    need = views.need.create_need(db, geocoder, request=need_create)
    return need
