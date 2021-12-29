from sqlalchemy import SMALLINT, Column, PrimaryKeyConstraint, Text
from sqlalchemy.orm import relationship

from app.db.base_class import FLBase


class PpeType(FLBase):
    __tablename__ = "PpeTypes"

    __table_args__ = (PrimaryKeyConstraint("Id", name="idx_20782_PK_PpeTypes"),)

    id = Column(
        "Id",
        SMALLINT,
        nullable=False,
        server_default="nextval(" "PpeTypes_Id_seq" "::regclass)",
    )
    name = Column("Name", Text, nullable=True)

    needs = relationship("NeedPpeType", back_populates="ppeType")
    suppliers = relationship("SupplierPpeType", back_populates="ppeType")
