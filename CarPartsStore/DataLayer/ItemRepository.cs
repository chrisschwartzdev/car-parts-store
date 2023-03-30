using DataLayer.Models;

namespace DataLayer;

public interface IItemRepository
{
    IEnumerable<Item> LoadItems();
    bool AddItem(Item item);
    bool DeleteItem(int id);
}

public class ItemRepository : IItemRepository
{
    private readonly CarpartsstoreContext _context;

    public ItemRepository(CarpartsstoreContext context)
    {
        _context = context;
    }
    
    public IEnumerable<Item> LoadItems()
    {
        return _context.Items.ToList();
    }

    public bool AddItem(Item item)
    {
        try
        {
            var id = _context.Items.Max(x => x.Id) + 1;
            item.Id = id;
            _context.Items.Add(item);
            _context.SaveChanges(); // todo: make async
        }
        catch
        {
            return false;
        }

        return true;
    }

    public bool DeleteItem(int id)
    {
        try
        {
            _context.Items.Remove(_context.Items.Single(x => x.Id == id));
            _context.SaveChanges();
        }
        catch
        {
            return false;
        }

        return true;
    }
}