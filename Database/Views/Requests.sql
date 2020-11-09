CREATE VIEW Requests
	AS 

SELECT 

	 Needs.Id 
	,Needs.[Timestamp]
	,Needs.UshahidiId
	,Needs.StatusId
	,Needs.ContactName
	,Needs.OrganisationName
	,Needs.Email
	,Needs.PhoneNumber
	,Needs.Department
	,Needs.JobTitle
	,Needs.OrgTypeId
	,Needs.OrgTypeOther
	,Needs.Postcode
	,Needs.TownOrCity
	,Needs.TweetId
	,Needs.Longitude
	,Needs.Latitude
	,Needs.TellUsMore
	--Ppe 
	,NeedPpeTypes.PpeTypeId
	,NeedPpeTypes.PpeTypeOther
	,NeedPpeTypes.DailyShortage
	,NeedPpeTypes.DailyShortageForWhom
	,NeedPpeTypes.StatusId AS PpeStatusId
	,NeedPpeTypes.SupplierId
	,NeedPpeTypes.SupplierOther
	,NeedPpeTypes.DateClosed
	--Ppe Suppliers 
	,Suppliers.[Name] AS SupplierName
	--Notes
	,MostRecentNotes.*


FROM 

	NeedPpeTypes 
	INNER JOIN Needs ON NeedPpeTypes.NeedId = Needs.Id 
	LEFT OUTER JOIN Suppliers ON NeedPpeTypes.SupplierId = Suppliers.Id

	OUTER APPLY 
	(
		SELECT TOP 1 
		LatestNotes.[Text] AS NoteText
		,LatestNotes.[Timestamp] AS NoteTimestamp
		,AspNetUsers.UserName AS NoteAuthor
		FROM Notes AS LatestNotes 
		LEFT OUTER JOIN NeedNotes ON NeedNotes.NoteId = LatestNotes.Id
		INNER JOIN AspNetUsers ON LatestNotes.UserId = AspNetUsers.Id
		WHERE NeedNotes.NeedId = Needs.Id
		ORDER BY LatestNotes.[Timestamp] DESC
	) AS MostRecentNotes
