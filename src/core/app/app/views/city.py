from sqlalchemy.orm import Session

from app import services
from app.schemas import PaginatedResponse, City


def get_all_cities(db: Session,) -> PaginatedResponse[City]:
    result = services.city.get_city_list(db)
    return PaginatedResponse(
        data=list(map(City.from_data, result.cities)),
        next=None,
        total=len(result.cities)
    )
