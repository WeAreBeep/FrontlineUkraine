from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.cache import cache
from app import views
from app.api import deps
from app.schemas.map import FeedNew

router = APIRouter()


@router.get("", response_model=FeedNew)
@cache.early(key="map", ttl="5m", early_ttl="2m")
async def get_map(db: Session = Depends(deps.get_db)) -> FeedNew:
    return views.map.get_map_data(db)
