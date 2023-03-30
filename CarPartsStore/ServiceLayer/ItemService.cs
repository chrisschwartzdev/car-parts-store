using DataLayer;
using DataLayer.Models;

namespace ServiceLayer;

public interface IItemService
{
    IEnumerable<Item> GetItems();
    bool AddItem(Item item);
    bool DeleteItem(int id);
}

public class ItemService : IItemService
{
    private readonly IItemRepository _itemRepository;

    public ItemService(IItemRepository itemRepository)
    {
        _itemRepository = itemRepository;
    }

    public IEnumerable<Item> GetItems() => _itemRepository.LoadItems();

    public bool AddItem(Item item) => _itemRepository.AddItem(item);
    public bool DeleteItem(int id) => _itemRepository.DeleteItem(id);
}