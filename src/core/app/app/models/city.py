from sqlalchemy import Column, PrimaryKeyConstraint, Text, BigInteger, Numeric
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Sequence

from app.db.base_class import FLBase


class City(FLBase):
    __tablename__ = "Cities"
    __table_args__ = (
        PrimaryKeyConstraint("Id", name="idx_PK_Cities"),
    )

    _id_seq = Sequence("Cities_Id_seq")

    id = Column("Id", BigInteger, server_default=_id_seq.next_value(), nullable=False)
    name_en = Column("NameEn", Text, nullable=False)
    name_ua = Column("NameUa", Text, nullable=False)
    lat = Column("Lat", Numeric, nullable=False)
    lng = Column("Lng", Numeric, nullable=False)

    needs = relationship("Need", back_populates="orgCity")
