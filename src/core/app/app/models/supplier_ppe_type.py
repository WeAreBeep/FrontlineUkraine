from sqlalchemy import (
    SMALLINT,
    BigInteger,
    Column,
    ForeignKeyConstraint,
    Integer,
    PrimaryKeyConstraint,
    Text,
)
from sqlalchemy.orm import relationship

from app.db.base_class import FLBase


class SupplierPpeType(FLBase):
    __tablename__ = "SupplierPpeTypes"

    __table_args__ = (
        PrimaryKeyConstraint(
            "SupplierId", "PpeTypeId", name="idx_20791_PK_SupplierPpeTypes"
        ),
        ForeignKeyConstraint(
            columns=["PpeTypeId"],
            refcolumns=["PpeTypes.Id"],
            name="fk_supplierppetypes_ppetypes",
            ondelete="CASCADE",
        ),
        ForeignKeyConstraint(
            columns=["SupplierId"],
            refcolumns=["Suppliers.Id"],
            name="fk_supplierppetypes_suppliers",
            ondelete="CASCADE",
        ),
    )

    supplierId = Column("SupplierId", BigInteger, nullable=False)
    ppeTypeId = Column("PpeTypeId", SMALLINT, nullable=False)
    ppeTypeOther = Column("PpeTypeOther", Text)
    costTypeId = Column("CostTypeId", Integer, nullable=False)
    costTypeOther = Column("CostTypeOther", Text)
    capacityPerWeek = Column("CapacityPerWeek", Integer, nullable=False)
    currentStock = Column("CurrentStock", Integer, nullable=False)
    leadTimeInDays = Column("LeadTimeInDays", Integer, nullable=False)
    notes = Column("Notes", Text)
    meetsRegulatoryRequirementsId = Column(
        "MeetsRegulatoryRequirementsId", Integer, nullable=False
    )

    ppeType = relationship("PpeType", back_populates="suppliers")
    supplier = relationship("Supplier", back_populates="ppeTypes")
