using System;

namespace Web.Snippets.System.ComponentModel.DataAnnotations
{
	/// <summary>
	/// Simply outputs the min step and max to vue for the number picker
	/// Could make this override Range(min, max) to add validation if wanted
	/// </summary>
	public class NumericalRangeAttribute : Attribute
	{
		public int Min { get; set; } 
		public int Step { get; set; }
		public int Max { get; set; }
		public NumericalRangeAttribute(int min, int step, int max)
		{
			Min = min;
			Max = max;
			Step = step;
		}
	}
}