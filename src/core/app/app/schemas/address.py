from typing import List

from .base import BaseModel
from .posttag import PosttagResponseData


def _has_content(x) -> bool:
    return len(x) > 0


class AddressEntry(BaseModel):
    idx: str
    label: str
    postcode: str
    address_line_one: str
    address_line_two: str

    @classmethod
    def from_response_data(cls, *, data: PosttagResponseData):
        line_one = ", ".join(
            filter(
                _has_content,
                [
                    data.sub_building,
                    " ".join(
                        filter(
                            _has_content, [data.number, data.sub_street, data.street]
                        )
                    ),
                ],
            )
        )
        line_two = ", ".join(filter(_has_content, [data.town, data.county]))
        return cls(
            idx=data.idx,
            label=f"{line_one}, {line_two}",
            postcode=data.postcode,
            address_line_one=line_one,
            address_line_two=line_two,
        )


class SearchAddressResponse(BaseModel):
    data: List[AddressEntry]
