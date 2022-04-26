from decimal import Decimal
from typing import Dict, List, Any

from geojson_pydantic import Feature, FeatureCollection
from geojson_pydantic import Point as GeoPoint
from pydantic import Field

from app.models import PpeTypeEnum
from app.schemas import BaseModel


class FeatureData(BaseModel):
    record_type: str
    record_id: int


RecordFeature = Feature[GeoPoint, FeatureData]

RecordFeatureCollection = FeatureCollection[GeoPoint, FeatureData]


class Point(BaseModel):
    location: List[Decimal]
    properties: FeatureData


class PointsList(BaseModel):
    ppe_type: str
    class_name: str = Field(None, alias="class")
    points: List[Point]


class PointsBreakdown(BaseModel):
    type: PpeTypeEnum
    geojson_feature_collection: RecordFeatureCollection


class MapData(BaseModel):
    points_count: int
    points_breakdowns: List[PointsBreakdown]
    posts: RecordFeatureCollection


class FeedNew(BaseModel):
    categories: Dict[str, MapData]
    records: Dict[str, Dict[int, Any]]
