from sqlalchemy import (
    SMALLINT,
    BigInteger,
    Column,
    DateTime,
    ForeignKeyConstraint,
    Integer,
    PrimaryKeyConstraint,
    Text,
)
from sqlalchemy.orm import relationship

from app.db.base_class import FLBase


class NeedPpeType(FLBase):
    __tablename__ = "NeedPpeTypes"

    __table_args__ = (
        PrimaryKeyConstraint("NeedId", "PpeTypeId", name="idx_20756_PK_NeedPpeTypes"),
        ForeignKeyConstraint(
            columns=["NeedId"],
            refcolumns=["Needs.Id"],
            name="fk_needppetypes_needs",
            ondelete="CASCADE",
        ),
        ForeignKeyConstraint(
            columns=["PpeTypeId"],
            refcolumns=["PpeTypes.Id"],
            name="fk_needppetypes_ppetypes",
            ondelete="CASCADE",
        ),
        ForeignKeyConstraint(
            columns=["SupplierId"],
            refcolumns=["Suppliers.Id"],
            name="fk_needppetypes_suppliers",
            ondelete="CASCADE",
        ),
    )

    needId = Column("NeedId", BigInteger, nullable=False)
    ppeTypeId = Column("PpeTypeId", SMALLINT, nullable=False)
    ppeTypeOther = Column("PpeTypeOther", Text)
    dailyShortage = Column("DailyShortage", Integer)
    dailyShortageForWhom = Column("DailyShortageForWhom", Text)
    statusId = Column("StatusId", Integer, nullable=False)
    supplierId = Column("SupplierId", BigInteger)
    supplierOther = Column("SupplierOther", Text)
    dateClosed = Column("DateClosed", DateTime(timezone=True))

    need = relationship("Need", back_populates="ppeTypes")
    ppeType = relationship("PpeType", back_populates="needs")
    supplier = relationship("Supplier", back_populates="needPpeTypes")
