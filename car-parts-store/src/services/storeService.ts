import { apiGet } from "../apiHelper";
import { Item, ItemSearchModel } from "../types";

const getItemsUrl = "store/items";

interface Store {
  items: Item[];
}

export class StoreService {
  async getItems(search?: ItemSearchModel): Promise<Store> {
    const response = await apiGet(getItemsUrl, search);

    if (!response.ok)
      throw Error('Failed to fetch items');

    return response.data;
  }
}