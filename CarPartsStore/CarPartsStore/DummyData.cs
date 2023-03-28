using CarPartsStore.Models;
using Newtonsoft.Json;

namespace CarPartsStore;

public class DummyData
{
    public const string DummyItemsJson = @"[
        {
            'id': 0,
            'name': 'Beeg Turbo',
            'cost': 1337
        },
        {
            'id': 1,
            'name': 'Super Loud Exhaust',
            'cost': 700
        },
        {
            'id': 2,
            'name': 'Cold Air Intake',
            'cost': 400
        }
    ]";

    public static Item[] DummyItems = JsonConvert.DeserializeObject<Item[]>(DummyItemsJson);
}