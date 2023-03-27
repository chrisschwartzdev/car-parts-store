using Microsoft.AspNetCore.Mvc;

namespace CarPartsStore.Controllers;

[ApiController]
[Route("[controller]")]
public class InventoryController : ControllerBase
{
    [HttpGet]
    public IActionResult Inventory()
    {
        var dummyInventory = new
        {
            Items = new [] {new {Id = 1, Name = "Beeg Turbo", Cost= 1337, Tags = new object[]{} }}
        };
        return Ok(dummyInventory);
    }

    public class AddItemRequest
    {
        public string Name { get; set; }
        public int Cost { get; set; }
        public int[] Tags { get; set; }
    }
    
    [HttpPost("addItem")]
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
    public IActionResult DeleteItem(int id)
    {
        if (id == 1)
            return BadRequest();
        
        return Ok();
    }
}
