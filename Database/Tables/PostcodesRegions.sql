CREATE TABLE PostcodesRegions
(
	Postcode nvarchar(8) NOT NULL,
	NhsRegionId tinyint NOT NULL,
	CONSTRAINT PK_PostcodesRegions PRIMARY KEY CLUSTERED (Postcode)
)
