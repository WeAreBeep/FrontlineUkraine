from typing import List, Tuple

from app.services.map import CityMapData as CityMapDataModel
from . import City, BaseModel


class CityMapData(BaseModel):
    city: City
    met_resource_type_stat: List[Tuple[int, int]]
    needs_resource_type_stat: List[Tuple[int, int]]

    @classmethod
    def from_data(cls, data: CityMapDataModel) -> "CityMapData":
        return CityMapData.construct(
            city=City.from_data(data.city),
            met_resource_type_stat=data.met_resource_type_stat,
            needs_resource_type_stat=data.needs_resource_type_stat,
        )
