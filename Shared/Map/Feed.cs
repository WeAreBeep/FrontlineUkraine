using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Shared.Map
{
	public class FeedNew
	{
        public MapData Needs {get; set;}
        public MapData NeedsMet { get; set; }
        public MapData Supplies {get; set;}
    }

    public class MapData
	{
		public int PointsCount {get; set;}
		public List<PointsList> PointsList { get; set; } = new List<PointsList>();
		public List<Post> Posts { get; set; } = new List<Post>();
	}





    public class Feed
    {
        public int NeedsPointsCount {get; set;}
        public List<PointsList> NeedsPoints { get; set; } = new List<PointsList>();
        public List<Post> NeedsPosts { get; set; } = new List<Post>();

        public int SuppliesPointsCount {get; set;}
        public List<PointsList> SuppliesPoints { get; set; } = new List<PointsList>();
        public List<Post> SuppliesPosts { get; set; } = new List<Post>();
    }
}
