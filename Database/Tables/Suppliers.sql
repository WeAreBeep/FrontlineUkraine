CREATE TABLE Suppliers
(
	Id bigint IDENTITY(1,1) NOT NULL,
	UshahidiId bigint,
	[Timestamp] datetimeoffset NOT NULL,
	StatusId int NOT NULL,
	[Name] nvarchar(200),
	[Description] nvarchar(max),
	SupplierTypeId int NOT NULL,
	SupplierTypeOther nvarchar(300),
	Email nvarchar(320),
	Website nvarchar(2084),
	PhoneNumber nvarchar(100),
	ContactName nvarchar(100),
	Postcode nvarchar(8) NOT NULL,
	TellUsMore nvarchar(max),
	Latitude decimal(9, 6),
	Longitude decimal(9, 6),
	CapacityNotes nvarchar(max),
	CONSTRAINT PK_Suppliers PRIMARY KEY CLUSTERED (Id)
)
