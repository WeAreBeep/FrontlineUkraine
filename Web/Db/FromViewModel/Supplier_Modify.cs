using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Models;
using Web.Snippets.System.Collections.Generic;

namespace Web.Db
{
	public partial class Supplier
	{
		public void Modify(EditSuppliesPost s, string currentUserId)
		{
			Modify(s.Supplies);
			StatusId = (int)s.Status.Status;

			updateBasicPpeDetails(s);

			Latitude = s.Location.Latitude;
			Longitude = s.Location.Longitude;

			if(!String.IsNullOrWhiteSpace(s.Notes.NewNote))
			{
				SupplierNote newNote = new SupplierNote
				{
					Supplier = this,
					Note = new Note
					{
						Timestamp = DateTimeOffset.Now,
						UserId = currentUserId,
						Text = s.Notes.NewNote,
					}
				};
				SupplierNotes.Add(newNote);
			}
		}

		
		/// <summary>
		/// Handle the PPE Types on LEFT (i.e. basic details HWCs submit)
		/// </summary>
		void updateBasicPpeDetails(EditSuppliesPost s)
		{
			List<PpeTypes> existingPpeTypes = SupplierPpeTypes.SelectToList(p => (PpeTypes)p.PpeTypeId);

			//create new 
			List<SupplierPpeTypeModel> ppeTypesToAdd = s.Supplies.PpeTypes.WhereToList(p => p.Selected && !existingPpeTypes.Contains(p.Type));
			foreach (SupplierPpeTypeModel supplierPpeTypeViewModel in ppeTypesToAdd)
			{
				SupplierPpeType ppeTypeToAdd = SupplierPpeType.Create_FromViewModel(supplierPpeTypeViewModel, this);
				SupplierPpeTypes.Add(ppeTypeToAdd);
			}

			//remove deselected 
			List<SupplierPpeTypeModel> ppeTypesToRemove = s.Supplies.PpeTypes.WhereToList(p => !p.Selected && existingPpeTypes.Contains(p.Type));
			foreach (SupplierPpeTypeModel supplierPpeTypeViewModel in ppeTypesToRemove)
			{
				SupplierPpeType typeToRemove = SupplierPpeTypes.Single(p => p.PpeTypeId == (byte)supplierPpeTypeViewModel.Type);
				SupplierPpeTypes.Remove(typeToRemove);
			}

			//edit rest (existing) 
			List<SupplierPpeTypeModel> ppeTypesToModify = s.Supplies.PpeTypes.WhereToList(p => p.Selected && existingPpeTypes.Contains(p.Type));
			foreach (SupplierPpeTypeModel supplierPpeTypeViewModel in ppeTypesToModify)
			{
				SupplierPpeType supplierExisting = SupplierPpeTypes.SingleOrDefault(p => p.PpeTypeId == (byte)supplierPpeTypeViewModel.Type);
				supplierExisting?.Modify(supplierPpeTypeViewModel); 
			}
		}

		public void Modify(SuppliesViewModel s)
		{
			ContactName = s.ContactName;
			Email = s.Email;
			PhoneNumber = s.PhoneNumber;
			Name = s.OrganisationName;			
			Postcode = s.Postcode;
			TellUsMore = s.TellUsMore;
			Description = s.Description;
			SupplierTypeId = (int)s.SupplierType;
			SupplierTypeOther = s.SupplierTypeOther;
			Website = s.Website;
			TransportType = s.TransportType;
			TransportTypeOther = s.TransportTypeOther;
		}
	}
}