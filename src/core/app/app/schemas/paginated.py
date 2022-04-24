from typing import Generic, TypeVar, List, Optional
from pydantic.generics import GenericModel

DataT = TypeVar('DataT')


class PaginatedResponse(GenericModel, Generic[DataT]):
    data: List[DataT]
    total: int
    next: Optional[int]
