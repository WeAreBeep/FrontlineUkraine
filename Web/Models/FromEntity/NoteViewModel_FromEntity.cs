using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Db;

namespace Web.Models
{
	public partial class NoteViewModel
	{
		public static NoteViewModel FromEntity(Note s)
		{
			return new NoteViewModel
			{
				Timestamp = s.Timestamp,
				Text = s.Text,
				AuthorFullName = s.User.UserName,
			};
		}
	}
}