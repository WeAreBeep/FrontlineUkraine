CREATE TABLE SupplierNotes
(
	SupplierId bigint NOT NULL,
	NoteId bigint NOT NULL,
	CONSTRAINT PK_SupplierNotes PRIMARY KEY CLUSTERED (SupplierId, NoteId),
	CONSTRAINT FK_SupplierNotes_Needs FOREIGN KEY (SupplierId) REFERENCES Suppliers (Id) ON DELETE CASCADE,
	CONSTRAINT FK_SupplierNotes_Notes FOREIGN KEY (NoteId) REFERENCES Notes (Id) ON DELETE CASCADE
)
