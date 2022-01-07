from typing import Any

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import views
from app.api import deps
from app.schemas.map import FeedNew

router = APIRouter()


@router.get("", response_model=FeedNew)
def get_map(db: Session = Depends(deps.get_db)) -> FeedNew:
    return views.map.get_map_data(db)


@router.get("/test", response_model=Any)
def get_test() -> Any:
    return "OK"
