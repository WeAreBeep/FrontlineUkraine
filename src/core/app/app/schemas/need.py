from typing import List, Optional

from pydantic import EmailStr, conint, validator

from app.models import OrgType, PpeTypeEnum

from .base import BaseModel
from .utils import map_enum_from_name


class NeedPpeTypeCreate(BaseModel):
    type: PpeTypeEnum
    type_other: Optional[str]
    daily_shortage: conint(ge=0)
    daily_shortage_for_whom: str

    _map_type = validator("type", pre=True, allow_reuse=True)(
        map_enum_from_name(PpeTypeEnum)
    )

    @validator("type_other")
    def type_other_required(cls, v, values):
        if values["type"] == PpeTypeEnum.Other:
            if v is None or len(v) == 0:
                raise ValueError("Field cannot be empty when type is Other")
        return v


class NeedCreate(BaseModel):
    publish_anonymously: bool
    organisation_name: str
    org_type: OrgType
    org_type_other: Optional[str]
    email: EmailStr
    phone_number: str
    contact_name: str
    job_title: str
    department: str
    address_line_one: str
    address_line_two: Optional[str]
    postcode: str
    tell_us_more: Optional[str]
    ppe_types: List[NeedPpeTypeCreate]

    _map_type = validator("org_type", pre=True, allow_reuse=True)(
        map_enum_from_name(OrgType)
    )

    @validator("org_type_other")
    def org_type_other_required(cls, v, values):
        if values["org_type"] == OrgType.Other:
            if v is None or len(v) == 0:
                raise ValueError(
                    "Field cannot be empty when organisation type is Other"
                )
        return v

    @validator("ppe_types")
    def ppe_types_should_not_empty(cls, v):
        has_can = len(v) != 0
        assert has_can, "Please choose at least one PPE Type which you can supply"
        return v
