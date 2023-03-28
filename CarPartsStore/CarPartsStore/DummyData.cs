using CarPartsStore.Models;
using Newtonsoft.Json;

namespace CarPartsStore;

public class DummyData
{
    public const string DummyItemsJson = @"[
        {
            'id': 0,
            'name': 'Beeg Turbo',
            'cost': 1337,
            'tags': []
        },
        {
            'id': 1,
            'name': 'Super Loud Exhaust',
            'cost': 700,
            'tags': []
        },
        {
            'id': 2,
            'name': 'Cold Air Intake',
            'cost': 400,
            'tags': []
        },
        {
            'id': 3,
            'name': 'Intercooler',
            'cost': 350,
            'tags': []
        },
        {
            'id': 4,
            'name': 'All Season Tires',
            'cost': 120,
            'tags': []
        },
    ]";

    public static Item[] DummyItems = JsonConvert.DeserializeObject<Item[]>(DummyItemsJson);
}