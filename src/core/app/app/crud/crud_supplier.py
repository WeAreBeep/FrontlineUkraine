from datetime import datetime
from typing import List

from pydantic import BaseModel
from sqlalchemy.orm import Query, Session

from app.crud.base import CRUDBase
from app.models.post_status import PostStatus
from app.models.supplier import Supplier
from app.models.supplier_ppe_type import SupplierPpeType
from app.schemas import SupplyCreate


def to_model(create_model: SupplyCreate) -> Supplier:
    supplier_model = Supplier(
        timestamp=datetime.utcnow(),
        statusId=PostStatus.UnderReview,
        name=create_model.organisation_name,
        description=create_model.description,
        supplierTypeId=create_model.supplier_type,
        supplierTypeOther=create_model.supplier_type_other,
        email=create_model.email,
        website=create_model.website,
        phoneNumber=create_model.phone_number,
        contactName=create_model.contact_name,
        postcode=create_model.postcode,
        tellUsMore=create_model.tell_us_more,
    )
    for ppe_type in create_model.ppe_types:
        supplier_ppe_type = SupplierPpeType(
            ppeTypeId=ppe_type.type,
            ppeTypeOther=ppe_type.type_other,
            costTypeId=ppe_type.cost_type,
            costTypeOther=ppe_type.cost_type_other,
            capacityPerWeek=ppe_type.capacity_per_week,
            currentStock=ppe_type.current_stock,
            leadTimeInDays=ppe_type.lead_time_in_days,
            notes=ppe_type.notes,
            meetsRegulatoryRequirementsId=ppe_type.meet_regulations,
        )
        supplier_model.ppeTypes.append(supplier_ppe_type)

    return supplier_model


class CRUDSupply(CRUDBase[Supplier, SupplyCreate, BaseModel]):
    def get_queryable_by_post_status(self, db: Session, *, status: PostStatus) -> Query:
        return (
            db.query(Supplier)
            .join(Supplier.ppeTypes)
            .filter(Supplier.statusId == status)
        )

    def get_all_by_post_status(
        self, db: Session, *, status: PostStatus
    ) -> List[Supplier]:
        return self.get_queryable_by_post_status(db, status=status).all()

    def create_from_request(self, db: Session, *, request: SupplyCreate) -> Supplier:
        supplier_model = to_model(request)
        return self.create(db, supplier_model)


supplier = CRUDSupply(Supplier)
