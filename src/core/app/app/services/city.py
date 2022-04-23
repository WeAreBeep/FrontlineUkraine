from dataclasses import dataclass
from typing import List

from sqlalchemy.orm import Session

from app import crud
from app.models import City


@dataclass
class GetCityListResult:
    cities: List[City]


def get_city_list(db: Session) -> GetCityListResult:
    cities = crud.city.get_all(db)
    return GetCityListResult(cities=cities)
