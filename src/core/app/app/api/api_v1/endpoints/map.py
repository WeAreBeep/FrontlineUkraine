from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_authgear_user_id
from app.cache import cache
from app import views
from app.api import deps
from app.schemas.map import FeedNew

router = APIRouter()


@router.get("", response_model=FeedNew, dependencies=[Depends(get_authgear_user_id)])
@cache.early(key="map", ttl="5m", early_ttl="2m")
async def get_map(db: Session = Depends(deps.get_db)):
    return views.map.get_map_data(db)


@router.get("/public", response_model=FeedNew)
@cache.early(key="map/public", ttl="7m", early_ttl="3m")
async def get_map_public(db: Session = Depends(deps.get_db)):
    return views.map.get_public_map_data(db)
