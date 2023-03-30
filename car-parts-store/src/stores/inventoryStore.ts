import { create } from "zustand";
import { InventoryService } from "../services/inventoryService";
import { Item } from "../types";

interface State {
  items?: Item[];
  fetchItems: () => void;
  addItem: (item: Item) => void;
  removeItem: (itemId: number) => void;
}

const inventoryService = new InventoryService();

const useInventoryStore = create<State>(set => ({
  items: undefined,
  fetchItems: async () => {
    const inventory = await inventoryService.getItems();
    set({ items: inventory.items })
  },
  addItem: async (request: Item) => {
    await inventoryService.addItem(request)
      .then(item => set(state => ({
        ...state,
        items: state.items?.concat([item])
      })))
  },
  removeItem: async (itemId: number) => {
    await inventoryService.removeItem(itemId)
      .then(() =>
        set(state => {
          const itemIndex = state.items?.findIndex(it => it.id === itemId) ?? 0;
          state.items?.splice(itemIndex, 1);
          return ({ ...state, items: state.items })
        }))
  }
}))

export default useInventoryStore;
