from sqlalchemy import BigInteger, Column, DateTime, Integer, PrimaryKeyConstraint, Text
from sqlalchemy.orm import relationship

from app.db.base_class import FLBase


class Note(FLBase):
    __tablename__ = "Notes"

    __table_args__ = (PrimaryKeyConstraint("Id", name="idx_20770_PK_Notes"),)

    id = Column("Id", BigInteger, quote=True)
    timestamp = Column("Timestamp", DateTime(timezone=True), quote=True)
    userId = Column("UserId", Integer, quote=True)
    text = Column("Text", Text, quote=True)

    needs = relationship("NeedNote", back_populates="note")
    suppliers = relationship("SupplierNote", back_populates="note")

    # TODO: Add user constraints
