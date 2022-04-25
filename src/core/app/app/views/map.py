import functools
from typing import Dict, List

from geojson_pydantic import Point as GeoPoint
from sqlalchemy.orm import Session

from app import services
from app.models import PpeTypeEnum
from app.schemas import PublicNeed, PublicSupply, City
from app.schemas.map import (
    FeatureData,
    FeedNew,
    MapData,
    PointsBreakdown,
    RecordFeature,
    RecordFeatureCollection,
)
from app.services.map import CityAndResourceTypeStats


def get_ppe_type_enum_text(e: PpeTypeEnum) -> str:
    if e == PpeTypeEnum.TypeIIRSurgicalMasks:
        return "Type IIR Surgical Masks"
    elif e == PpeTypeEnum.FFP1RespiratorMasks:
        return "FFP1 Respirator Masks"
    elif e == PpeTypeEnum.FFP2RespiratorMasks:
        return "FFP2 Respirator Masks"
    elif e == PpeTypeEnum.FFP3RespiratorMasks:
        return "FFP3 Respirator Masks"
    elif e == PpeTypeEnum.SafetyGlasses:
        return "Safety Glasses"
    elif e == PpeTypeEnum.FaceVisors:
        return "Face Visors"
    elif e == PpeTypeEnum.AlcoholHandGel:
        return "Alcohol Hand Gel"
    elif e == PpeTypeEnum.Other:
        return "Other..."
    return e.name


TYPES_TO_CLASSES = {
    # Blues
    "Type IIR Surgical Masks": "b1",  # #A0C7E1
    "FFP1 Respirator Masks": "b2",  # 4C80B6
    "FFP2 Respirator Masks": "b3",  # 0C4C96
    "FFP3 Respirator Masks": "b4",  # 20254B
    # Greens
    "Gowns": "g1",  # 64AE3F
    "Aprons": "g2",  # 21652D
    "Gloves": "g3",  # 71C2AC
    "Scrubs": "g4",  # 00966B
    # Purples
    "Safety Glasses": "p1",  # 9388AA
    "Face Visors": "p2",  # 4B3F72
    "Alcohol Hand Gel": "p3",  # 54243C
    # Grey
    "Other...": "gr1",  # 706F6F
}


def make_type_points_breakdown_dict() -> Dict[PpeTypeEnum, RecordFeatureCollection]:
    result = {}
    for k, v in PpeTypeEnum.__members__.items():
        result[v] = RecordFeatureCollection(features=[])
    return result


def _append_feature_to_breakdown(a, kv):
    a[kv[0]].features.append(kv[1])
    return a


class MapDataFactory:
    # TODO: Refactor factory
    @classmethod
    def from_need_records(cls, *, data: List[PublicNeed]) -> MapData:
        type_points_map = make_type_points_breakdown_dict()
        posts = RecordFeatureCollection(features=[])
        post_features = list(
            map(
                lambda d: {
                    "post": RecordFeature.construct(
                        id=f"{d.id}_post",
                        geometry=GeoPoint.construct(coordinates=d.coordinate_array),
                        properties=FeatureData.construct(
                            record_type="need", record_id=int(d.id)
                        ),
                    ),
                    "ppe_type_breakdowns": dict(
                        map(
                            lambda ppe_type_record: (
                                ppe_type_record.ppe_type,
                                RecordFeature.construct(
                                    id=f"{d.id}_{ppe_type_record.ppe_type}",
                                    geometry=GeoPoint.construct(
                                        coordinates=d.coordinate_array
                                    ),
                                    properties=FeatureData(
                                        record_type="need", record_id=int(d.id)
                                    ),
                                ),
                            ),
                            d.ppe_types,
                        )
                    ),
                },
                data,
            )
        )
        posts.features.extend(list(map(lambda entry: entry["post"], post_features)))

        functools.reduce(
            lambda acc, curr: functools.reduce(
                _append_feature_to_breakdown, curr["ppe_type_breakdowns"].items(), acc
            ),
            post_features,
            type_points_map,
        )
        return MapData(
            points_count=functools.reduce(
                lambda x, y: x + y,
                map(
                    lambda point_list: len(point_list.features),
                    type_points_map.values(),
                ),
                0,
            ),
            points_breakdowns=[
                PointsBreakdown.construct(
                    type=key, geojson_feature_collection=collection
                )
                for (key, collection) in type_points_map.items()
            ],
            posts=posts,
        )

    @classmethod
    def from_supply_records(cls, *, data: List[PublicSupply]) -> MapData:
        type_points_map = make_type_points_breakdown_dict()
        posts = RecordFeatureCollection(features=[])
        post_features = list(
            map(
                lambda d: {
                    "post": RecordFeature.construct(
                        id=f"{d.id}_post",
                        geometry=GeoPoint.construct(coordinates=d.coordinate_array),
                        properties=FeatureData.construct(
                            record_type="supply", record_id=int(d.id)
                        ),
                    ),
                    "ppe_type_breakdowns": dict(
                        map(
                            lambda ppe_type_record: (
                                ppe_type_record.ppe_type,
                                RecordFeature.construct(
                                    id=f"{d.id}_{ppe_type_record.ppe_type}",
                                    geometry=GeoPoint.construct(
                                        coordinates=d.coordinate_array
                                    ),
                                    properties=FeatureData(
                                        record_type="supply", record_id=int(d.id)
                                    ),
                                ),
                            ),
                            d.ppe_types,
                        )
                    ),
                },
                data,
            )
        )
        posts.features.extend(list(map(lambda entry: entry["post"], post_features)))

        functools.reduce(
            lambda acc, curr: functools.reduce(
                _append_feature_to_breakdown, curr["ppe_type_breakdowns"].items(), acc
            ),
            post_features,
            type_points_map,
        )
        return MapData(
            points_count=functools.reduce(
                lambda x, y: x + y,
                map(
                    lambda point_list: len(point_list.features),
                    type_points_map.values(),
                ),
                0,
            ),
            points_breakdowns=[
                PointsBreakdown.construct(
                    type=key, geojson_feature_collection=collection
                )
                for (key, collection) in type_points_map.items()
            ],
            posts=posts,
        )

    @classmethod
    def from_city_meta_records(cls, *, data: List[CityAndResourceTypeStats]) -> MapData:
        type_points_map = make_type_points_breakdown_dict()
        posts = RecordFeatureCollection(features=[])
        post_features = list(
            map(
                lambda d: {
                    "post": RecordFeature.construct(
                        id=f"{d.city.id}_post",
                        geometry=GeoPoint.construct(coordinates=d.city.coordinate_array),
                        properties=FeatureData.construct(
                            record_type="city", record_id=int(d.city.id)
                        ),
                    ),
                    "ppe_type_breakdowns": dict(
                        map(
                            lambda ppe_type_record: (
                                ppe_type_record[0],
                                RecordFeature.construct(
                                    id=f"{d.city.id}_{ppe_type_record[0]}",
                                    geometry=GeoPoint.construct(
                                        coordinates=d.city.coordinate_array
                                    ),
                                    properties=FeatureData(
                                        record_type="city", record_id=int(d.city.id)
                                    ),
                                ),
                            ),
                            d.resource_type_stat.items(),
                        )
                    ),
                },
                data,
            )
        )
        posts.features.extend(list(map(lambda entry: entry["post"], post_features)))

        functools.reduce(
            lambda acc, curr: functools.reduce(
                _append_feature_to_breakdown, curr["ppe_type_breakdowns"].items(), acc
            ),
            post_features,
            type_points_map,
        )
        return MapData(
            points_count=functools.reduce(
                lambda x, y: x + y,
                map(
                    lambda point_list: len(point_list.features),
                    type_points_map.values(),
                ),
                0,
            ),
            points_breakdowns=[
                PointsBreakdown.construct(
                    type=key, geojson_feature_collection=collection
                )
                for (key, collection) in type_points_map.items()
            ],
            posts=posts,
        )


def get_map_data(db: Session):
    result = services.map.get_map_data(db)
    needs = [PublicNeed.from_data(n) for n in result.needs]
    needs_met = [PublicNeed.from_data(n) for n in result.met]
    supplies = [PublicSupply.from_data(s) for s in result.suppliers]

    all_needs = []
    all_needs.extend(needs_met)
    all_needs.extend(needs)

    need_dict = dict(map(lambda need: (need.id, need), all_needs))
    supply_dict = dict(map(lambda supply: (supply.id, supply), supplies))

    return FeedNew(
        categories={
            "needs": MapDataFactory.from_need_records(data=needs),
            "needs_met": MapDataFactory.from_need_records(data=needs_met),
            "supplies": MapDataFactory.from_supply_records(data=supplies),
        },
        records={"need": need_dict, "supply": supply_dict},
    ).dict()


def get_public_map_data(db: Session):
    result = services.map.get_public_map_data(db)
    supplies = [PublicSupply.from_data(s) for s in result.suppliers]

    city_dict = dict(map(lambda entry: (entry[0], City.from_data(entry[1])), result.city_dict.items()))
    supply_dict = dict(map(lambda supply: (supply.id, supply), supplies))
    return FeedNew(
        categories={
            "needs": MapDataFactory.from_city_meta_records(data=result.needs),
            "needs_met": MapDataFactory.from_city_meta_records(data=result.met),
            "supplies": MapDataFactory.from_supply_records(data=supplies),
        },
        records={"city": city_dict, "supply": supply_dict},
    ).dict()
