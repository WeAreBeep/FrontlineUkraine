from sqlalchemy import BigInteger, Column, ForeignKeyConstraint, PrimaryKeyConstraint
from sqlalchemy.orm import relationship

from app.db.base_class import FLBase


class SupplierNote(FLBase):
    __tablename__ = "SupplierNotes"

    __table_args__ = (
        PrimaryKeyConstraint("SupplierId", "NoteId", name="idx_20788_PK_SupplierNotes"),
        ForeignKeyConstraint(
            columns=["SupplierId"],
            refcolumns=["Suppliers.Id"],
            name="fk_suppliernotes_needs",
            ondelete="CASCADE",
        ),
        ForeignKeyConstraint(
            columns=["NoteId"],
            refcolumns=["Notes.Id"],
            name="fk_suppliernotes_notes",
            ondelete="CASCADE",
        ),
    )

    supplierId = Column("SupplierId", BigInteger, nullable=False)
    noteId = Column("NoteId", BigInteger, nullable=False)

    supplier = relationship("Supplier", back_populates="notes")
    note = relationship("Note", back_populates="suppliers")
