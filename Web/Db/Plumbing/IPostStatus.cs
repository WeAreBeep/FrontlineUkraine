using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Db
{
	public interface IPostStatus
	{
		int StatusId { get; set; }
		long? UshahidiId {get; set;}
	}
}
