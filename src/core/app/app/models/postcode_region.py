from sqlalchemy import SMALLINT, Column, PrimaryKeyConstraint, Text

from app.db.base_class import FLBase


class PostcodeRegion(FLBase):
    __tablename__ = "PostcodesRegions"
    __table_args__ = (
        PrimaryKeyConstraint("Postcode", name="idx_20776_PK_PostcodesRegions"),
    )

    postcode = Column("Postcode", Text, nullable=False)
    nhsRegionId = Column("NhsRegionId", SMALLINT, nullable=False)
