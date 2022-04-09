CREATE OR ALTER VIEW Supplies
	AS 

SELECT 

	 Suppliers.Id 
	,Suppliers.[Timestamp]
	,Suppliers.UshahidiId
	,Suppliers.StatusId
	,Suppliers.[Name]
	,Suppliers.[Description]
	,Suppliers.SupplierTypeId
	,Suppliers.SupplierTypeOther
	,Suppliers.Email
	,Suppliers.Website
	,Suppliers.PhoneNumber
	,Suppliers.ContactName
	,Suppliers.Postcode
	,Suppliers.TellUsMore
	,Suppliers.Longitude
	,Suppliers.Latitude

	--Ppe 
	,SupplierPpeTypes.PpeTypeId
	,SupplierPpeTypes.PpeTypeOther
	,SupplierPpeTypes.CostTypeId
	,SupplierPpeTypes.CostTypeOther
	,SupplierPpeTypes.CapacityPerWeek
	,SupplierPpeTypes.CurrentStock
	,SupplierPpeTypes.LeadTimeInDays
	,SupplierPpeTypes.Notes
	,SupplierPpeTypes.MeetsRegulatoryRequirementsId

	--Notes
	,MostRecentNotes.*


FROM 

	SupplierPpeTypes 
	INNER JOIN Suppliers ON SupplierPpeTypes.SupplierId = Suppliers.Id 


	OUTER APPLY 
	(
		SELECT TOP 1 
		LatestNotes.[Text] AS NoteText
		,LatestNotes.[Timestamp] AS NoteTimestamp
		,AspNetUsers.UserName AS NoteAuthor
		FROM Notes AS LatestNotes 
		LEFT OUTER JOIN SupplierNotes ON SupplierNotes.NoteId = LatestNotes.Id
		INNER JOIN AspNetUsers ON LatestNotes.UserId = AspNetUsers.Id
		WHERE SupplierNotes.SupplierId = Suppliers.Id
		ORDER BY LatestNotes.[Timestamp] DESC
	) AS MostRecentNotes
