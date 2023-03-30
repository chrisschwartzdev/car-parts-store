import { apiGet } from "../apiHelper";
import { ItemSearchModel, Store } from "../types";

const getItemsUrl = "store/items";

export class StoreService {
  async getItems(search?: ItemSearchModel): Promise<Store> {
    const response = await apiGet(getItemsUrl, search);

    if (!response.ok)
      throw Error('Failed to fetch items');

    return response.data;
  }
}