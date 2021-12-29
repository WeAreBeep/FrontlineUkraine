from typing import List

from pydantic import BaseModel
from sqlalchemy.orm import Query, Session

from app.crud.base import CRUDBase
from app.models.post_status import PostStatus
from app.models.supplier import Supplier


class CRUDSupply(CRUDBase[Supplier, BaseModel, BaseModel]):
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


supplier = CRUDSupply(Supplier)
