from decimal import Decimal
from typing import List

from pydantic import Field

from app.schemas import BaseModel


class Point(BaseModel):
    location: List[Decimal]
    popup_html: str


class PointsList(BaseModel):
    ppe_type: str
    class_name: str = Field(None, alias="class")
    points: List[Point]


class MapData(BaseModel):
    points_count: int
    points_list: List[PointsList]
    posts: List[Point]


class FeedNew(BaseModel):
    needs: MapData
    needs_met: MapData
    supplies: MapData
