SET IDENTITY_INSERT [dbo].[Suppliers] ON 

GO
INSERT [dbo].[Suppliers] ([Id], [UshahidiId], [Timestamp], [Name], [Description], [SupplierTypeId], [SupplierTypeOther], [Email], [Website], [PhoneNumber], [ContactName], Postcode, [Story], [Latitude], [Longitude]) VALUES (2, 123, CAST(N'2020-05-22T11:54:53.8370000+00:00' AS DateTimeOffset), N'Test Supplier', N'Some Description', 1, NULL, N'some@email.com', NULL, NULL, NULL, N'N16 0RH', NULL, CAST(52.991172 AS Decimal(9, 6)), CAST(-6.100888 AS Decimal(9, 6)))
GO
SET IDENTITY_INSERT [dbo].[Suppliers] OFF
GO
INSERT [dbo].[SupplierPpeTypes] ([SupplierId], [PpeTypeId], [PpeTypeOther], [CostTypeId], [CostTypeOther], [CapacityPerWeek], [CurrentStock], [LeadTimeInDays], [Notes], [MeetsRegulatoryRequirementsId]) VALUES (2, 1, NULL, 2, NULL, 10000, 50000, 2, N'Some notes', 1)
GO
INSERT [dbo].[SupplierPpeTypes] ([SupplierId], [PpeTypeId], [PpeTypeOther], [CostTypeId], [CostTypeOther], [CapacityPerWeek], [CurrentStock], [LeadTimeInDays], [Notes], [MeetsRegulatoryRequirementsId]) VALUES (2, 2, NULL, 1, NULL, 3456, 3, 45, N'Other notes', 2)
GO
