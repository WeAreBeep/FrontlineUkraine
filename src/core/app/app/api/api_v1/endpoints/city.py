from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.cache import cache
from app import views
from app.api import deps
from app.schemas import PaginatedResponse, City

router = APIRouter()


@router.get("", response_model=PaginatedResponse[City])
@cache.early(key="city_list", ttl="3h", early_ttl="1h")
async def get_map(db: Session = Depends(deps.get_db)) -> PaginatedResponse[City]:
    return views.city.get_all_cities(db)
