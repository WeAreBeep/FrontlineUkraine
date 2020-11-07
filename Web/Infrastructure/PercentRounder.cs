using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Infrastructure
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    public class PercentRounder
    {
        public class PercentInfo
        {
            public int Index;
            public int Percent;
            public decimal Remainder;

            public PercentInfo(int index, decimal number)
            {
                Index = index;
                Percent = (int)Math.Floor(number);
                Remainder = (int)(((decimal)number % 1) * 100);
            }
        }

        public static List<int> Compute(params decimal[] numbers)
        {
            var total = (int)Math.Round(numbers.Sum());
            var values = numbers
                .Select((p, index) => new PercentInfo(index, p))
                .OrderByDescending(p => p.Remainder).ToList();
            var remainder = total - values.Sum(p => p.Percent);

            foreach (var value in values)
            {
                if (remainder == 0) break;

                value.Percent++;
                remainder--;
            }

            return values.OrderBy(p => p.Index).Select(p => p.Percent).ToList();
        }
    }
}
