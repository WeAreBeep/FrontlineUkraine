using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Models
{
	public partial class NoteViewModel
	{
		[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd HH:mm}")]
		public DateTimeOffset Timestamp { get; set; }
		public string Text { get; set; }
		public string AuthorFullName { get; set; }
	}
}
