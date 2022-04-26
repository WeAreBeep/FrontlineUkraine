from dataclasses import dataclass
from typing import List, Dict, Tuple
from collections import OrderedDict

from sqlalchemy.orm import Session

from app import crud
from app.models import Need, PostStatus, PpeStatus, Supplier, City


@dataclass
class GetMapDataResult:
    met: List[Need]
    needs: List[Need]
    suppliers: List[Supplier]


@dataclass
class CityAndResourceTypeStats:
    city: City
    resource_type_stat: Dict[int, int]


@dataclass
class CityMapData:
    city: City
    # (ppe type id, count)
    met_resource_type_stat: List[Tuple[int, int]]
    needs_resource_type_stat: List[Tuple[int, int]]


@dataclass
class GetPublicMapDataResult:
    met: List[CityAndResourceTypeStats]
    needs: List[CityAndResourceTypeStats]
    suppliers: List[Supplier]
    city_dict: Dict[int, CityMapData]


def get_map_data(db: Session) -> GetMapDataResult:
    needs_met = crud.need.get_all_published_by_ppe_status(db, statuses={PpeStatus.Met})
    needs_not_met = crud.need.get_all_published_by_ppe_status(
        db, statuses={PpeStatus.NotMet, PpeStatus.New, PpeStatus.InProgress}
    )
    suppliers = crud.supplier.get_all_by_post_status(db, status=PostStatus.Published)
    return GetMapDataResult(met=needs_met, needs=needs_not_met, suppliers=suppliers,)


def get_public_map_data(db: Session) -> GetPublicMapDataResult:
    all_cities = crud.city.get_all(db)
    needs_met = crud.need.get_city_meta(db,
                                        post_status=PostStatus.Published,
                                        ppe_statuses={PpeStatus.Met})

    city_dict = dict(map(lambda city: (city.id, CityMapData(
        city=city,
        met_resource_type_stat=[],
        needs_resource_type_stat=[])), all_cities))
    needs_met_dict = OrderedDict()
    for need_met in needs_met:
        [city_id, ppe_type_id, count] = need_met
        ppe_type_dict = needs_met_dict.setdefault(city_id, {})
        ppe_type_dict[ppe_type_id] = count
        city_dict[city_id].met_resource_type_stat.append((ppe_type_id, count))

    needs = crud.need.get_city_meta(db,
                                    post_status=PostStatus.Published,
                                    ppe_statuses={PpeStatus.NotMet, PpeStatus.New, PpeStatus.InProgress})

    needs_not_met_dict = OrderedDict()
    for need in needs:
        [city_id, ppe_type_id, count] = need
        ppe_type_dict = needs_not_met_dict.setdefault(city_id, {})
        ppe_type_dict[ppe_type_id] = count
        city_dict[city_id].needs_resource_type_stat.append((ppe_type_id, count))

    suppliers = crud.supplier.get_all_by_post_status(db, status=PostStatus.Published)
    return GetPublicMapDataResult(
        met=list(map(
            lambda entry: CityAndResourceTypeStats(
                city=city_dict.get(entry[0]).city,
                resource_type_stat=entry[1]
            ), needs_met_dict.items())),
        needs=list(map(
            lambda entry: CityAndResourceTypeStats(
                city=city_dict.get(entry[0]).city,
                resource_type_stat=entry[1]
            ), needs_not_met_dict.items())),
        suppliers=suppliers,
        city_dict=city_dict)
