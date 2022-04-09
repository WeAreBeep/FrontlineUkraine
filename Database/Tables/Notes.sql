CREATE TABLE Notes
(
	Id bigint IDENTITY(1,1) NOT NULL,
	[Timestamp] datetimeoffset NOT NULL,
	UserId nvarchar(450) NOT NULL,
	[Text] nvarchar(max),
	CONSTRAINT PK_Notes PRIMARY KEY CLUSTERED (Id),
	CONSTRAINT FK_Notes_Users FOREIGN KEY (UserId) REFERENCES AspNetUsers (Id) ON DELETE CASCADE,
)
