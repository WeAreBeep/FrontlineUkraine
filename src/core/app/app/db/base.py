# Import all the models, so that Base has them before being
# imported by Alembic
from app.db.base_class import Base  # noqa
from app.db.base_class import FLBase  # noqa
from app.models.audit import Audit  # noqa
from app.models.item import Item  # noqa
from app.models.need import Need  # noqa
from app.models.need_note import NeedNote  # noqa
from app.models.note import Note  # noqa
from app.models.user import User  # noqa
