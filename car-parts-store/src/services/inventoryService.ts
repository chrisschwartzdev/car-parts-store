import { apiDelete, apiGet, apiPost } from "../apiHelper";
import { Item } from "../types";

const getInventoryUrl = "inventory";
const addItemUrl = "inventory/addItem";
const deleteItemUrl = "inventory/deleteItem";

interface Inventory {
  items: Item[];
}

export class InventoryService {
  async getItems(): Promise<Inventory> {
    const response = await apiGet(getInventoryUrl);

    if (!response.ok)
      throw Error('Failed to fetch items');

    return response.data;
  }
  async addItem(request: Omit<Item, 'id'>): Promise<Item> {
    const response = await apiPost(addItemUrl, request);

    if (!response.ok)
      throw Error('Failed to add item');

    return response.data;
  }
  async removeItem(request: number) {
    const response = await apiDelete(deleteItemUrl, request.toString());

    if (!response.ok)
      throw Error('Failed to delete item');
  }
}