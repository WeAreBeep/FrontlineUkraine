MERGE INTO PpeTypes AS Target 
USING (VALUES 
	(1, 'TypeIIRSurgicalMasks'),
	(2, 'FFP1RespiratorMasks'), 
	(3, 'FFP2RespiratorMasks'),
	(4, 'FFP3RespiratorMasks'),
	(5, 'Gowns'),
	(6, 'Aprons'),
	(7, 'Gloves'),
	(8, 'Scrubs'),
	(9, 'SafetyGlasses'),
	(10, 'FaceVisors'),
	(11, 'AlcoholHandGel'),
	(12, 'Other')
) 
AS Source (Id, Name) ON Target.Id = Source.Id 

WHEN MATCHED THEN 
	UPDATE SET Name = Source.Name 

WHEN NOT MATCHED BY TARGET THEN 
	INSERT (Id, Name) 
	VALUES (Id, Name) 

WHEN NOT MATCHED BY SOURCE THEN 
	DELETE
;




MERGE INTO AspNetRoles AS Target 
USING (VALUES 
	('24d1b503-2a4e-4019-a479-021de3328dba', 'SuperAdmin', 'SUPERADMIN', '6ebe1a7b-4693-4bb1-8f49-05952c4fd9a2'),
	('9f740b9f-e78d-4dcb-80da-9822e5618db6', 'Admin', 'ADMIN', 'a77283d3-6530-42af-89bb-c321d25e0be5'),
	('00949d0a-5ba7-4b65-8d12-45df4ce1bf2c', 'Volunteer', 'VOLUNTEER', '65bc40b2-8b41-42a4-9a81-3a0d1ce98c5c')
) 
AS Source (Id, Name, NormalizedName, ConcurrencyStamp) ON Target.Id = Source.Id 

WHEN MATCHED THEN 
	UPDATE SET Name = Source.Name, NormalizedName = Source.NormalizedName 

WHEN NOT MATCHED BY TARGET THEN 
	INSERT (Id, Name, NormalizedName, ConcurrencyStamp) 
	VALUES (Id, Name, NormalizedName, ConcurrencyStamp) 

WHEN NOT MATCHED BY SOURCE THEN 
	DELETE
;