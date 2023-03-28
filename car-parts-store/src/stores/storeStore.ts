import { create } from "zustand";
import { StoreService } from "../services/storeService";
import { Item, ItemSearchModel } from "../types";

interface StoreState {
  items: Item[];
  fetchItems: (search?: ItemSearchModel) => void;
}

const storeService = new StoreService();

const useStoreStore = create<StoreState>()(set => ({
  items: [],
  fetchItems: async search => {
    const inventory = await storeService.getItems(search);
    set(() => ({ items: inventory.items }))
  },
}))

export default useStoreStore;
