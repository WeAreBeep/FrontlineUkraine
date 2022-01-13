from typing import List

from pydantic import Field

from .base import BaseModel


class PosttagResponseData(BaseModel):
    """
    Sample response
    {
        "Idx": "33126667",
        "Organisation": "",
        "Sub Building": "Flat 143",
        "Number": "46",
        "Building": "",
        "Sub Street": "",
        "Locality": "",
        "Street": "Palmers Road",
        "Area": "",
        "Town": "London",
        "County": "London",
        "Post Code": "E2 0TD",
        "Latitude": "0",
        "Longitude": "0"
    }
    """

    idx: str = Field(alias="Idx")
    organization: str = Field(alias="Organisation")
    sub_building: str = Field(alias="Sub Building")
    number: str = Field(alias="Number")
    building: str = Field(alias="Building")
    sub_street: str = Field(alias="Sub Street")
    locality: str = Field(alias="Locality")
    street: str = Field(alias="Street")
    area: str = Field(alias="Area")
    town: str = Field(alias="Town")
    county: str = Field(alias="County")
    postcode: str = Field(alias="Post Code")
    latitude: str = Field(alias="Latitude")
    longitude: str = Field(alias="Longitude")


class PosttagPostcodeFullResponse(BaseModel):
    status_code: str
    status: str
    msg: str
    data: List[PosttagResponseData]
