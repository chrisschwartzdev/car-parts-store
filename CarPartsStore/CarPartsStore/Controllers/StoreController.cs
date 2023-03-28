using CarPartsStore.Models;
using Microsoft.AspNetCore.Mvc;

namespace CarPartsStore.Controllers;

[ApiController]
[Route("[controller]")]
public class StoreController : ControllerBase
{
    [HttpGet("items")]
    public IActionResult GetItems([FromQuery]ItemSearchModel? search)
    {
        var items = DummyData.DummyItems as IEnumerable<Item>;
        if (!string.IsNullOrEmpty(search?.Query)) items = items.Where(x => x.Name.ToLower().Contains(search.Query.ToLower()));
        
        var store = new { Items = items };
        return Ok(store);
    }
}