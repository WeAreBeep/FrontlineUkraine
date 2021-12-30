from pydantic import BaseModel as PydanticBaseModel


def to_camel(string: str) -> str:
    return "".join(
        word if idx == 0 else word.capitalize()
        for (idx, word)
        in enumerate(string.split("_"))
    )


class BaseModel(PydanticBaseModel):
    class Config:
        alias_generator = to_camel
        allow_population_by_field_name = True
