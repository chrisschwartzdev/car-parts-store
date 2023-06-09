using DataLayer.Models;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer;

namespace CarPartsStore.Controllers;

[ApiController]
[Route("[controller]")]
public class InventoryController : ControllerBase
{
    private readonly IItemService _itemService;

    public InventoryController(IItemService itemService)
    {
        _itemService = itemService;
    }
    
    [HttpGet]
    [AuthorizeFilter(AuthorizationType.UserAuthLevel, requiredAuthLevel: AuthLevel.Admin)]
    public IActionResult Inventory()
    {
        var items = _itemService.GetItems();
        return Ok(new { Items = items });
    }

    public class AddItemRequest
    {
        public string Name { get; set; }
        public int Cost { get; set; }
        public int[] Tags { get; set; }
    }
    
    [HttpPost("addItem")]
    [AuthorizeFilter(AuthorizationType.UserAuthLevel, requiredAuthLevel: AuthLevel.Admin)]
    public IActionResult AddItem(AddItemRequest request)
    {
        if (request == null)
            return BadRequest();

        var item = new Item
        {
            Name = request.Name,
            Cost = request.Cost
        };

        var result = _itemService.AddItem(item);

        return result ? Ok(item) : Problem(); // todo: Throw exception in other layers, add exception handler
    }

    [HttpDelete("deleteItem/{id:int}")]
    [AuthorizeFilter(AuthorizationType.UserAuthLevel, requiredAuthLevel: AuthLevel.Admin)]
    public IActionResult DeleteItem(int id)
    {
        var result = _itemService.DeleteItem(id);
        return result ? Ok() : Problem();
    }
}
