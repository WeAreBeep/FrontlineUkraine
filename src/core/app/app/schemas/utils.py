from enum import Enum
from typing import Any, Callable, Type


def map_enum_from_name(enum: Type[Enum]) -> Callable[[Any], Enum]:
    def mapper(v: Any):
        return enum[v]

    return mapper
