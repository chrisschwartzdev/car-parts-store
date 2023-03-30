using System;
using System.Collections.Generic;

namespace DataLayer.Models;

public partial class ItemToTag
{
    public int Id { get; set; }

    public int ItemId { get; set; }

    public int TagId { get; set; }

    public virtual Item Item { get; set; }

    public virtual Tag Tag { get; set; }
}
