from enum import IntEnum
from typing import List, TypeVar

IntEnumVar = TypeVar("IntEnumVar", bound=IntEnum)


class IntEnumUtils:
    @classmethod
    def values(cls, enum: IntEnumVar) -> List[IntEnumVar]:
        return [e for e in enum]
