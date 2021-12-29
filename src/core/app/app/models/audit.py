from sqlalchemy import BigInteger, Column, DateTime, PrimaryKeyConstraint, Text

from app.db.base_class import FLBase


class Audit(FLBase):
    __tablename__ = "Audits"

    __table_args__ = (PrimaryKeyConstraint("Id", name="idx_20741_PK_Audits"),)

    id = Column("Id", BigInteger, quote=True)
    timestamp = Column("Timestamp", DateTime, nullable=False, quote=True)
    userName = Column("UserName", Text, quote=True)
    tableName = Column("TableName", Text, quote=True)
    action = Column("Action", Text, quote=True)
    keyValues = Column("KeyValues", Text, quote=True)
    oldValues = Column("OldValues", Text, quote=True)
    newValues = Column("NewValues", Text, quote=True)
