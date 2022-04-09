CREATE TABLE NeedPpeTypes
(
	NeedId bigint NOT NULL,
	PpeTypeId tinyint NOT NULL,
	PpeTypeOther nvarchar(max),
	DailyShortage int,
	DailyShortageForWhom nvarchar(500),
	StatusId int NOT NULL,
	SupplierId bigint,
	SupplierOther nvarchar(500),
	DateClosed datetimeoffset,
	--UserId 
	--Timestamp? 
	CONSTRAINT PK_NeedPpeTypes PRIMARY KEY CLUSTERED (NeedId, PpeTypeId),
	CONSTRAINT FK_NeedPpeTypes_Needs FOREIGN KEY (NeedId) REFERENCES Needs (Id) ON DELETE CASCADE,
	CONSTRAINT FK_NeedPpeTypes_PpeTypes FOREIGN KEY (PpeTypeId) REFERENCES PpeTypes (Id) ON DELETE CASCADE,
	CONSTRAINT FK_NeedPpeTypes_Suppliers FOREIGN KEY (SupplierId) REFERENCES Suppliers (Id) ON DELETE CASCADE
)
