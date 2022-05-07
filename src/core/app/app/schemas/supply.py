from datetime import timezone
from typing import List, Optional

from pydantic import EmailStr, conint, validator

from app.models import (
    CostType,
    MeetRegulations,
    PpeTypeEnum,
    Supplier,
    SupplierPpeType,
    SupplierType,
    TransportType,
)

from .base import BaseModel
from .record import Record
from .utils import map_enum_from_name


class SupplyPpeTypeCreate(BaseModel):
    type: PpeTypeEnum
    type_other: Optional[str]
    meet_regulations: MeetRegulations
    cost_type: CostType
    cost_type_other: Optional[str]
    capacity_per_week: conint(ge=0)
    current_stock: conint(ge=0)
    lead_time_in_days: conint(ge=0)
    notes: Optional[str]

    _map_type = validator("type", pre=True, allow_reuse=True)(
        map_enum_from_name(PpeTypeEnum)
    )
    _map_meet_regulations = validator("meet_regulations", pre=True, allow_reuse=True)(
        map_enum_from_name(MeetRegulations)
    )
    _map_cost_type = validator("cost_type", pre=True, allow_reuse=True)(
        map_enum_from_name(CostType)
    )

    @validator("type_other")
    def type_other_required(cls, v, values):
        if values["type"] == PpeTypeEnum.Other:
            if v is None or len(v) == 0:
                raise ValueError("Field cannot be empty when type is Other")
        return v

    @validator("cost_type_other")
    def cost_type_other_required(cls, v, values):
        if values["cost_type"] == CostType.Other:
            if v is None or len(v) == 0:
                raise ValueError("Field cannot be empty when cost_type is Other")
        return v


class SupplyCreate(BaseModel):
    organisation_name: str
    description: str
    supplier_type: SupplierType
    supplier_type_other: Optional[str]
    email: EmailStr
    website: Optional[str]
    phone_number: str
    contact_name: str
    postcode: str
    transport_type: TransportType = TransportType.No
    transport_type_other: Optional[str]
    tell_us_more: Optional[str]
    ppe_types: List[SupplyPpeTypeCreate]

    _map_supplier_type = validator("supplier_type", pre=True, allow_reuse=True)(
        map_enum_from_name(SupplierType)
    )

    @validator("supplier_type_other")
    def supplier_type_other_required(cls, v, values):
        if values["supplier_type"] == SupplierType.Other:
            if v is None or len(v) == 0:
                raise ValueError("Field cannot be empty when supplier type is Other")
        return v

    @validator("transport_type_other")
    def transport_type_other_required(cls, v, values):
        if values["transport_type"] == TransportType.Other:
            if v is None or len(v) == 0:
                raise ValueError("Field cannot be empty when transport type is Other")
        return v

    @validator("ppe_types")
    def ppe_types_should_not_empty(cls, v):
        has_can = len(v) != 0
        assert has_can, "Please choose at least one PPE Type which you can supply"
        return v


class PublicSupplyPpeType(BaseModel):
    ppe_type: PpeTypeEnum
    ppe_type_other: Optional[str]

    @validator("ppe_type_other")
    def ppe_type_other_to_none_if_empty(cls, v):
        if not v:
            return None
        return v

    @classmethod
    def from_data(cls, data: SupplierPpeType) -> "PublicSupplyPpeType":
        return PublicSupplyPpeType.construct(
            ppe_type=PpeTypeEnum(data.ppeTypeId),
            ppe_type_other=None if not data.ppeTypeOther else data.ppeTypeOther,
        )


class PublicSupply(Record):
    ppe_types: List[PublicSupplyPpeType]
    description: str
    capacity_notes: Optional[str]
    website: Optional[str]
    transport_type: TransportType
    transport_type_other: Optional[str]

    @classmethod
    def from_data(cls, data: Supplier) -> "PublicSupply":
        return PublicSupply.construct(
            id=data.id,
            datetime=data.timestamp.astimezone(timezone.utc),
            postcode=data.postcode,
            latitude=data.latitude,
            longitude=data.longitude,
            organisation=data.name,
            ppe_types=[PublicSupplyPpeType.from_data(p) for p in data.ppeTypes],
            tweet_id=None,
            description=data.description,
            capacity_notes=data.capacityNotes,
            website=data.website,
            transport_type=data.transport_type,
            transport_type_other=data.transport_type_other,
        )
