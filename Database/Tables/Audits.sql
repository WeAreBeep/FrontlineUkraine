CREATE TABLE Audits
(
	Id bigint IDENTITY(1,1) NOT NULL,
	[Timestamp] datetimeoffset NOT NULL,
	UserName	nvarchar(256),
	TableName	nvarchar(128),
	[Action]	nvarchar(50),
	KeyValues	nvarchar(250),
	OldValues	nvarchar(max),
	NewValues	nvarchar(max),
	CONSTRAINT PK_Audits PRIMARY KEY CLUSTERED (Id),
)
