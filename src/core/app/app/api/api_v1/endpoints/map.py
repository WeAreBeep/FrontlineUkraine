from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api import deps
from app.schemas.map import FeedNew
from app import views

router = APIRouter()


@router.get("", response_model=FeedNew)
def get_map(db: Session = Depends(deps.get_db)) -> FeedNew:
    return views.map.get_map_data(db)
