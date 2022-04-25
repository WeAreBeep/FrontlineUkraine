from pydantic import BaseModel

from .base import CRUDBase
from app.models.city import City


class CRUDCity(CRUDBase[City, BaseModel, BaseModel]):
    pass


city = CRUDCity(City)
