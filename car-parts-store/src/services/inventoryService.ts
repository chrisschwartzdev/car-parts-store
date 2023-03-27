import { get, post } from "../ajaxHelper";
import { Item } from "../stores/inventoryStore";

const getInventoryUrl = "inventory";
const addItemUrl = "inventory/addItem";

interface Inventory {
  items: Item[];
}

export class InventoryService {
  async getItems(): Promise<Inventory> {
    const response = await get(getInventoryUrl);

    if (!response.ok)
      throw Error('Failed to fetch items');

    return response.data;
  }
  async addItem(request: Omit<Item, 'id'>): Promise<Item> {
    const response = await post(addItemUrl, request);

    if (!response.ok)
      throw Error('Failed add item');

    return response.data;
  }
}