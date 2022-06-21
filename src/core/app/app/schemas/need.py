from datetime import timezone
from typing import List, Optional

from pydantic import EmailStr, conint, validator, constr

from app.models import Need, NeedPpeType, OrgType, PpeStatus, PpeTypeEnum

from .base import BaseModel
from .record import Record
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
    org_govt_approval_image_id: Optional[str]
    org_has_govt_approval: bool
    org_reg_code: constr(regex=r"^\d{7,8}$")
    org_type: Optional[OrgType]
    org_type_other: Optional[str]
    org_city_id: int
    email: EmailStr
    phone_number: str
    contact_name: str
    job_title: Optional[str]
    department: Optional[str]
    address_line_one: str
    address_line_two: Optional[str]
    postcode: constr(regex=r"^(/{3})?.+\..+\..+$")
    tell_us_more: Optional[str]
    ppe_types: List[NeedPpeTypeCreate]

    _map_type = validator("org_type", pre=True, allow_reuse=True)(
        map_enum_from_name(OrgType)
    )

    @validator("org_type")
    def org_type_other_required(cls, v, values):
        if v == OrgType.Other:
            if values["org_type"] is None or len(values["org_type"]) == 0:
                raise ValueError(
                    "Field cannot be empty when organisation type is Other"
                )
        return v

    @validator("ppe_types")
    def ppe_types_should_not_empty(cls, v):
        has_can = len(v) != 0
        assert has_can, "Please choose at least one resource category which you need"
        return v


class PublicNeedPpeType(BaseModel):
    status: PpeStatus
    ppe_type: PpeTypeEnum
    ppe_type_other: Optional[str]

    @classmethod
    def from_data(cls, data: NeedPpeType) -> "PublicNeedPpeType":
        return PublicNeedPpeType.construct(
            status=PpeStatus(data.statusId),
            ppe_type=PpeTypeEnum(data.ppeTypeId),
            ppe_type_other=None if not data.ppeTypeOther else data.ppeTypeOther,
        )


class PublicNeed(Record):
    ppe_types: List[PublicNeedPpeType]
    contact_name: Optional[str]
    department: Optional[str]
    phone_number: Optional[str]

    @classmethod
    def from_data(cls, data: Need) -> "PublicNeed":
        return PublicNeed.construct(
            id=data.id,
            datetime=data.timestamp.astimezone(timezone.utc),
            postcode=data.postcode,
            latitude=data.latitude,
            longitude=data.longitude,
            organisation=f"{data.organisationName}",
            ppe_types=[PublicNeedPpeType.from_data(p) for p in data.ppeTypes],
            tweet_id=f"{data.tweetId}" if data.tweetId else None,
            contact_name=data.contactName,
            department=data.department,
            phone_number=data.phoneNumber
        )
