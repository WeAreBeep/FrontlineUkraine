from pydantic import BaseModel as PydanticBaseModel


def to_camel(string: str) -> str:
    return "".join(word.capitalize() for word in string.split("_"))


class BaseModel(PydanticBaseModel):
    class Config:
        alias_generator = to_camel
