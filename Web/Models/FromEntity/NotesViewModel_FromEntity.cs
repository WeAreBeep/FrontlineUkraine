using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Web.Db;
using Web.Infrastructure;
using Web.Snippets.System.Collections.Generic;

namespace Web.Models
{
    public partial class NotesViewModel
    {
		/// <summary>
		/// //TODO:TD would be nice to have an interface like ILocation,
		/// think can we also drop the M2M table entities here and
		/// instead restructure context to map e.g. Need.Notes directly onto Need and Supplier
		/// </summary>
		public static NotesViewModel FromNeed(Need s)
		{
			return new NotesViewModel
			{
				Notes = s.NeedNotes.SelectToList(n => n.Note).SelectToList(NoteViewModel.FromEntity)
			};
		}

		public static NotesViewModel FromSupplier(Supplier s)
		{
			return new NotesViewModel
			{
				Notes = s.SupplierNotes.SelectToList(n => n.Note).SelectToList(NoteViewModel.FromEntity)
			};
		}
	}
}