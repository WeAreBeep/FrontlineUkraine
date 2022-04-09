using System.ComponentModel.DataAnnotations;
using Web.Db;
using Web.Infrastructure;

namespace Web.Models
{
	public partial class TwitterViewModel
	{
		public static TwitterViewModel FromEntity(Need s)
		{
			return new TwitterViewModel
			{
				TweetId = s.TweetId
			};
		}
	}
}