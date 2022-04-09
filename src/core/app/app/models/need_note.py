from sqlalchemy import BigInteger, Column, ForeignKeyConstraint, PrimaryKeyConstraint
from sqlalchemy.orm import relationship

from app.db.base_class import FLBase


class NeedNote(FLBase):
    __tablename__ = "NeedNotes"

    __table_args__ = (
        PrimaryKeyConstraint("NeedId", "NoteId", name="idx_20753_PK_NeedNotes"),
        ForeignKeyConstraint(
            columns=["NeedId"],
            refcolumns=["Needs.Id"],
            name="fk_neednotes_needs",
            ondelete="CASCADE",
        ),
        ForeignKeyConstraint(
            columns=["NoteId"],
            refcolumns=["Notes.Id"],
            name="fk_neednotes_notes",
            ondelete="CASCADE",
        ),
    )

    needId = Column("NeedId", BigInteger, nullable=False)
    noteId = Column("NoteId", BigInteger, nullable=False)

    need = relationship("Need", back_populates="notes")
    note = relationship("Note", back_populates="needs")
