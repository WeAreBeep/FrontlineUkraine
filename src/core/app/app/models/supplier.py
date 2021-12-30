from sqlalchemy import (
    BigInteger,
    Column,
    DateTime,
    Integer,
    Numeric,
    PrimaryKeyConstraint,
    Text,
)
from sqlalchemy.orm import relationship

from app.db.base_class import FLBase


class Supplier(FLBase):
    __tablename__ = "Suppliers"

    __table_args__ = (PrimaryKeyConstraint("Id", name="idx_20797_PK_Suppliers"),)

    id = Column("Id", BigInteger, quote=True, autoincrement=True)
    ushahidiId = Column("UshahidiId", BigInteger, quote=True)
    timestamp = Column("Timestamp", DateTime(timezone=True), quote=True)
    statusId = Column("StatusId", Integer, quote=True)
    name = Column("Name", Text, quote=True)
    description = Column("Description", Text, quote=True)
    supplierTypeId = Column("SupplierTypeId", Integer, quote=True)
    supplierTypeOther = Column("SupplierTypeOther", Text, quote=True)
    email = Column("Email", Text, quote=True)
    website = Column("Website", Text, quote=True)
    phoneNumber = Column("PhoneNumber", Text, quote=True)
    contactName = Column("ContactName", Text, quote=True)
    postcode = Column("Postcode", Text, quote=True)
    tellUsMore = Column("TellUsMore", Text, quote=True)
    latitude = Column("Latitude", Numeric, quote=True)
    longitude = Column("Longitude", Numeric, quote=True)
    capacityNotes = Column("CapacityNotes", Text, quote=True)

    notes = relationship("SupplierNote", back_populates="supplier")
    ppeTypes = relationship("SupplierPpeType", back_populates="supplier")
    needPpeTypes = relationship("NeedPpeType", back_populates="supplier")
