from pydantic import BaseModel
from typing import Dict

from app.models.city import City as CityModel
from .utils import to_multilingual_text


class City(BaseModel):
    id: int
    name: Dict[str, str]

    @classmethod
    def from_data(cls, data: CityModel) -> "City":
        return City.construct(
            id=data.id,
            name=to_multilingual_text(data.__dict__, 'name'),
        )
