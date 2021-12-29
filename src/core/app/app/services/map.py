from typing import Any

from sqlalchemy.orm import Session

from app import crud
from app.models import PostStatus, PpeStatus


def get_map_data(db: Session) -> Any:
    needs_met = crud.need.get_all_published_by_ppe_status(db, statuses={PpeStatus.Met})
    needs_not_met = crud.need.get_all_published_by_ppe_status(
        db, statuses={PpeStatus.NotMet, PpeStatus.New, PpeStatus.InProgress}
    )
    suppliers = crud.supplier.get_all_by_post_status(db, status=PostStatus.Published)
    return {
        "met": len(needs_met),
        "needs": len(needs_not_met),
        "suppliers": len(suppliers),
    }
