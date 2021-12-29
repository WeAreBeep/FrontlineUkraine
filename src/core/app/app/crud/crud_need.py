from typing import List, Set

from pydantic import BaseModel
from sqlalchemy import func
from sqlalchemy.orm import Query, Session

from app.crud.base import CRUDBase
from app.models.need import Need
from app.models.need_ppe_type import NeedPpeType
from app.models.post_status import PostStatus


class CRUDNeed(CRUDBase[Need, BaseModel, BaseModel]):
    def get_queryable_by_post_status(self, db: Session, *, status: PostStatus) -> Query:
        return db.query(Need).join(Need.ppeTypes).filter(Need.statusId == status)

    def get_all_by_post_status(self, db: Session, *, status: PostStatus) -> List[Need]:
        return self.get_queryable_by_post_status(db, status=status).all()

    def get_all_published_by_ppe_status(
        self, db: Session, *, statuses: Set
    ) -> List[Need]:
        subquery: Query = db.query(NeedPpeType.needId).filter(
            NeedPpeType.statusId.in_(statuses)
        ).having(func.count(NeedPpeType.needId) > 0).group_by(
            NeedPpeType.needId, NeedPpeType.statusId
        ).subquery()
        return (
            self.get_queryable_by_post_status(db, status=PostStatus.Published)
            .filter(Need.id.in_(subquery))
            .all()
        )


need = CRUDNeed(Need)
