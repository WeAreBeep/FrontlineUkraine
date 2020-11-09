using System.ComponentModel.DataAnnotations;
using Web.Infrastructure;

namespace Web.Models
{
	public partial class TwitterViewModel
	{
		[Display(Name = "Tweet Id", Description = "Optional Id of a tweet. \"Copy link to Tweet\" https://help.twitter.com/en/using-twitter/tweet-and-moment-url")]
		public long? TweetId { get; set; }
	}
}
