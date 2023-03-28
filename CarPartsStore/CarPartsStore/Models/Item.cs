namespace CarPartsStore.Models;

public class Item
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int Cost { get; set; }
    public int[] Tags { get; set; }
}