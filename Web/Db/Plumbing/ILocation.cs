using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Db
{
	public interface ILocation
	{
		decimal? Latitude { get; set; }
		decimal? Longitude { get; set; }
	}
}
