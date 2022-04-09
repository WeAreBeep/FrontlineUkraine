using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Db;

namespace Web.Models
{
	public partial class LocationViewModel
	{
		public static LocationViewModel FromEntity(ILocation s)
		{
			return new LocationViewModel
			{
				Longitude = s.Longitude,
				Latitude = s.Latitude
			};
		}
	}
}