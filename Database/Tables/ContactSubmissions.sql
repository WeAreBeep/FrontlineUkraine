CREATE TABLE ContactSubmissions
(
	Id bigint IDENTITY(1,1) NOT NULL,
	[Name] nvarchar(100),
	Email nvarchar(320),
	[Message] nvarchar(max),
	EmailedTo nvarchar(2000),
	Created datetimeoffset(7) NOT NULL,
	CONSTRAINT PK_ContactSubmissions PRIMARY KEY CLUSTERED (Id)
)
