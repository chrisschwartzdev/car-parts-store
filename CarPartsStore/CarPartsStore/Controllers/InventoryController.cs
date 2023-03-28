using Microsoft.AspNetCore.Mvc;

namespace CarPartsStore.Controllers;

[ApiController]
[Route("[controller]")]
public class InventoryController : ControllerBase
{
    [HttpGet]
    [AuthorizeFilter(AuthorizationType.UserAuthLevel, requiredAuthLevel: AuthLevel.Admin)]
    public IActionResult Inventory()
    {
        var dummyInventory = new { Items = DummyData.DummyItems };
        return Ok(dummyInventory);
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
        var newItem = new
        {
            Id = 2000,
            Name = request.Name,
            Cost = request.Cost,
            Tags = request.Tags
        };
        return Ok(newItem);
    }

    [HttpDelete("deleteItem/{id:int}")]
    [AuthorizeFilter(AuthorizationType.UserAuthLevel, requiredAuthLevel: AuthLevel.Admin)]
    public IActionResult DeleteItem(int id)
    {
        if (id == 1)
            return BadRequest();
        
        return Ok();
    }
}
