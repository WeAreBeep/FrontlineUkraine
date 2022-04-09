--D:\SQLData\MSSQL12.MSSQLSERVER\MSSQL\Backup\2020-06-25 x.front.forlive.bak
BEGIN TRANSACTION 


	UPDATE Suppliers 
	SET 
	Email = SupplierContactDetails.Email,
	PhoneNumber = SupplierContactDetails.PhoneNumber,
	ContactName = SupplierContactDetails.ContactName

	FROM 
	Suppliers 
	INNER JOIN SupplierContactDetails ON Suppliers.UshahidiId = SupplierContactDetails.UshahidiId 

	--x.front for live => 115 Rows 2020-06-25 

---COMMIT TRANSACTION 
ROLLBACK TRANSACTION 





BEGIN TRANSACTION 


	DROP TABLE SupplierContactDetails


---COMMIT TRANSACTION 
ROLLBACK TRANSACTION 
