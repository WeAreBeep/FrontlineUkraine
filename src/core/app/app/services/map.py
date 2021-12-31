from dataclasses import dataclass
from typing import List

from sqlalchemy.orm import Session

from app import crud
from app.models import Need, PostStatus, PpeStatus, Supplier


@dataclass
class GetMapDataResult:
    met: List[Need]
    needs: List[Need]
    suppliers: List[Supplier]


def get_map_data(db: Session) -> GetMapDataResult:
    needs_met = crud.need.get_all_published_by_ppe_status(db, statuses={PpeStatus.Met})
    needs_not_met = crud.need.get_all_published_by_ppe_status(
        db, statuses={PpeStatus.NotMet, PpeStatus.New, PpeStatus.InProgress}
    )
    suppliers = crud.supplier.get_all_by_post_status(db, status=PostStatus.Published)
    return GetMapDataResult(met=needs_met, needs=needs_not_met, suppliers=suppliers,)
