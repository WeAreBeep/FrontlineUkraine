from datetime import datetime
from decimal import Decimal
from typing import Optional

from .base import BaseModel


class Record(BaseModel):
    id: int
    datetime: datetime
    organisation: str
    postcode: str
    latitude: Optional[Decimal]
    longitude: Optional[Decimal]
    tweet_id: Optional[str]

    @property
    def coordinate_array(self):
        return [self.longitude, self.latitude]
