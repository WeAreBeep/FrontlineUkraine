import dataclasses
import functools
from datetime import datetime, timezone
from decimal import Decimal
from typing import Dict, List, Optional, Union

from sqlalchemy.orm import Session

from app import services
from app.models import Need, NeedPpeType, PpeTypeEnum, Supplier, SupplierPpeType
from app.schemas.map import FeedNew, MapData, Point, PointsList


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


def make_type_points_dict() -> Dict[str, List[Point]]:
    result = {}
    for k in TYPES_TO_CLASSES.keys():
        result[k] = []
    return result


@dataclasses.dataclass
class MapBase:
    id: int
    date_time: datetime
    organisation: str
    postcode: str
    ppe_type_names: List[str] = dataclasses.field(init=False)
    ppe_types: List[Union[SupplierPpeType, NeedPpeType]]
    other_ppe_types: Optional[str] = dataclasses.field(init=False)
    latitude: Optional[Decimal]
    longitude: Optional[Decimal]
    tweet_id: Optional[str]
    posted_html: str = dataclasses.field(init=False)
    location_array: List[Decimal] = dataclasses.field(init=False)

    def __post_init__(self):
        self.posted_html = "TODO"
        self.ppe_type_names = [
            get_ppe_type_enum_text(PpeTypeEnum(ppeType.ppeTypeId))
            for ppeType in self.ppe_types
        ]
        other_ppe_types = [
            p for p in self.ppe_types if PpeTypeEnum(p.ppeTypeId) == PpeTypeEnum.Other
        ]
        if len(other_ppe_types) != 0:
            self.other_ppe_types = other_ppe_types[0].ppeTypeOther
        self.location_array = [self.latitude, self.longitude]


@dataclasses.dataclass
class NeedMapPointData(MapBase):
    pass


@dataclasses.dataclass
class SupplierMapPointData(MapBase):
    description: str
    capacity_notes: str
    website: str
    website_valid: bool = dataclasses.field(init=False)
    website_html: str = dataclasses.field(init=False)

    def __post_init__(self):
        super(SupplierMapPointData, self).__post_init__()
        self.website_valid = self.website is not None and len(self.website) != 0
        self.website_html = (
            f"<a class='website_link' target='_blank' title='Visit supplier website' href='{self.website}'><i class='fas fa-link fa-2x'></i></a>"
            if self.website_valid
            else None
        )


class MapPointDataFactory(object):
    @classmethod
    def from_need(cls, need: Need) -> NeedMapPointData:
        return NeedMapPointData(
            id=need.id,
            date_time=need.timestamp.astimezone(timezone.utc),
            postcode=need.postcode,
            latitude=need.latitude,
            longitude=need.longitude,
            organisation=need.organisationName,
            ppe_types=[p for p in need.ppeTypes],
            tweet_id=f"{need.tweetId}",
        )

    @classmethod
    def from_supplier(cls, supplier: Supplier) -> SupplierMapPointData:
        return SupplierMapPointData(
            id=supplier.id,
            date_time=supplier.timestamp.astimezone(timezone.utc),
            postcode=supplier.postcode,
            latitude=supplier.latitude,
            longitude=supplier.longitude,
            organisation=supplier.name,
            ppe_types=[p for p in supplier.ppeTypes],
            tweet_id=None,
            description=supplier.description,
            capacity_notes=supplier.capacityNotes,
            website=supplier.website,
        )


class MapDataFactory:
    @classmethod
    def from_point_data(cls, *, data: List[MapBase]) -> MapData:
        type_points_map = make_type_points_dict()
        posts = []
        for datum in data:
            posts.append(Point(location=datum.location_array, popup_html="TODO"))
            for ppe_type_name in datum.ppe_type_names:
                type_points_map[ppe_type_name].append(
                    Point(location=datum.location_array, popup_html="TODO")
                )
        return MapData(
            points_count=functools.reduce(
                lambda x, y: x + y,
                map(lambda point_list: len(point_list), type_points_map.values()),
                0,
            ),
            points_list=[
                PointsList(
                    ppe_type=key, class_name=TYPES_TO_CLASSES[key], points=point_list
                )
                for (key, point_list) in type_points_map.items()
            ],
            posts=posts,
        )


def get_map_data(db: Session):
    result = services.map.get_map_data(db)
    return FeedNew(
        needs=MapDataFactory.from_point_data(
            data=[MapPointDataFactory.from_need(n) for n in result.needs]
        ),
        needs_met=MapDataFactory.from_point_data(
            data=[MapPointDataFactory.from_need(n) for n in result.met]
        ),
        supplies=MapDataFactory.from_point_data(
            data=[MapPointDataFactory.from_supplier(s) for s in result.suppliers]
        ),
    )
