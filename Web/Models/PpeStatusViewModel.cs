using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Web.Db;

namespace Web.Models
{
    public partial class PpeStatusViewModel
    {
        public PpeTypes PpeType { get; set; }
		public PpeStatus Status { get; set; }
        public int? SupplierId { get; set; }
        public string SupplierOther { get; set; }

        [Display(Name = "Date", Description = "Date when need was closed")
        ,DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd/MMM/yyyy}")]
        public DateTimeOffset? DateNeedsMet { get; set; }
    }
}



