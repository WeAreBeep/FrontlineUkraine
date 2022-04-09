from typing import Any

from sqlalchemy.ext.declarative import as_declarative


@as_declarative()
class Base:
    id: Any


@as_declarative()
class FLBase:
    id: Any
    timestamp: Any
