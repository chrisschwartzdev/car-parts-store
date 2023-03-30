using System;
using System.Collections.Generic;

namespace DataLayer.Models;

public partial class Item
{
    public int Id { get; set; }

    public string Name { get; set; }

    public decimal Cost { get; set; }

    public virtual ICollection<ItemToTag> ItemToTags { get; } = new List<ItemToTag>();
}
