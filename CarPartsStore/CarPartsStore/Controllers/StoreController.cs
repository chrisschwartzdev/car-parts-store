using CarPartsStore.Models;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer;

namespace CarPartsStore.Controllers;

[ApiController]
[Route("[controller]")]
public class StoreController : ControllerBase
{
    private readonly ItemService _itemService;

    public StoreController()
    {
        _itemService = new ItemService();
    }
    
    [HttpGet("items")]
    public IActionResult GetItems([FromQuery]ItemSearchModel? search)
    {
        var items = _itemService.GetItems();
        if (!string.IsNullOrEmpty(search?.Query)) items = items.Where(x => x.Name.ToLower().Contains(search.Query.ToLower()));
        
        var store = new { Items = items };
        return Ok(store);
    }
}