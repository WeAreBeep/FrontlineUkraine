using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Web.Db;
using Web.Infrastructure;

namespace Web.Models
{
    public partial class NotesViewModel : NotesData
    {
        public List<NoteViewModel> Notes { get; set; } = new List<NoteViewModel>();
    }

	public class NotesData 
	{
		[Display(Name = "New Note", Description = "Add a new note to this record when you save"),
		StringLength(10000, MinimumLength = 3, ErrorMessage = Settings.ValMsgs.StringLengthWithMinimum)]
		public string NewNote { get; set; }
	}
}