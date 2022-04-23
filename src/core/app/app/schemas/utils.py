from enum import Enum
from typing import Any, Callable, Type, Dict

LANGS = [
    'en',
    'uk'
]


def map_enum_from_name(enum: Type[Enum]) -> Callable[[Any], Enum]:
    def mapper(v: Any):
        return enum[v]

    return mapper


def to_multilingual_text(obj: Any, prefix: str) -> Dict[str, str]:
    obj_dict = dict(obj)
    return {
        'en': obj_dict.get(f'{prefix}_en', None),
        'uk': obj_dict.get(f'{prefix}_uk', None),
    }
