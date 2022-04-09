CREATE TABLE SupplierPpeTypes
(
	SupplierId bigint NOT NULL,
	PpeTypeId tinyint NOT NULL,
	PpeTypeOther nvarchar(max),
	CostTypeId int NOT NULL,
	CostTypeOther nvarchar(500),
	CapacityPerWeek int NOT NULL,
	CurrentStock int NOT NULL,
	LeadTimeInDays int NOT NULL,
	Notes nvarchar(max),
	MeetsRegulatoryRequirementsId int NOT NULL,
	CONSTRAINT PK_SupplierPpeTypes PRIMARY KEY CLUSTERED (SupplierId, PpeTypeId),
	CONSTRAINT FK_SupplierPpeTypes_Suppliers FOREIGN KEY (SupplierId) REFERENCES Suppliers (Id) ON DELETE CASCADE,
	CONSTRAINT FK_SupplierPpeTypes_PpeTypes FOREIGN KEY (PpeTypeId) REFERENCES PpeTypes (Id) ON DELETE CASCADE
)
