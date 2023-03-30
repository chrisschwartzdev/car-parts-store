using DataLayer.Models;

namespace DataLayer;

public class ItemRepository
{
    public IEnumerable<Item> LoadItems()
    {
        using var db = new CarpartsstoreContext();
        return db.Items.ToList();
    }

    public bool AddItem(Item item)
    {
        using var db = new CarpartsstoreContext();
        try
        {
            var id = db.Items.Max(x => x.Id) + 1;
            item.Id = id;
            db.Items.Add(item);
            db.SaveChanges();
        }
        catch
        {
            return false;
        }

        return true;
    }
}