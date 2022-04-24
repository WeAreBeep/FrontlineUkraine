from pydantic import BaseModel
from typing import List
from sqlalchemy.orm import Session

from .base import CRUDBase
from app.models.city import City


class CRUDCity(CRUDBase[City, BaseModel, BaseModel]):
    def get_all(self, db: Session,) -> List[City]:
        return db.query(City).all()


city = CRUDCity(City)
