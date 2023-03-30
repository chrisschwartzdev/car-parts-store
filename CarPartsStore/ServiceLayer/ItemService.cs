using DataLayer;
using DataLayer.Models;

namespace ServiceLayer;

public class ItemService
{
    private readonly ItemRepository _itemRepository;

    public ItemService()
    {
        _itemRepository = new ItemRepository();
    }

    public IEnumerable<Item> GetItems() => _itemRepository.LoadItems();

    public bool AddItem(Item item) => _itemRepository.AddItem(item);
}