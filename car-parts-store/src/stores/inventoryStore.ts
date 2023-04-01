import { create } from "zustand";
import { InventoryService } from "../services/inventoryService";
import { Item } from "../types";
import SubscriptionManager, { SubscriptionModel } from "../utils/SubscriptionManager";

interface State extends SubscriptionModel {
  items?: Item[];
  fetchItems: () => void;
  addItem: (item: Item) => void;
  removeItem: (itemId: number) => void;
  loadingState?: "add" | "remove";
}

const inventoryService = new InventoryService();

const useInventoryStore = create<State>(set => {
  const sm = new SubscriptionManager(() => set({ loadingState: undefined }))
  return ({
    ...sm.getFunctions(),
    items: undefined,
    fetchItems: async () => {
      const inventory = await inventoryService.getItems();
      set({ items: inventory.items })
    },
    addItem: async (request: Item) => {
      set({ loadingState: "add" })
      await inventoryService.addItem(request)
        .then(item => {
          sm.publishResult();
          set(state => ({ items: state.items?.concat([item]) }))
        })
        .catch(sm.publishResult)
    },
    removeItem: async (itemId: number) => {
      set({ loadingState: "remove" })
      await inventoryService.removeItem(itemId)
        .then(() => {
          sm.publishResult();
          set(state => {
            const itemIndex = state.items?.findIndex(it => it.id === itemId) ?? 0;
            state.items?.splice(itemIndex, 1);
            return ({ items: state.items })
          })
        })
        .catch(sm.publishResult)
    }
  })
})

export default useInventoryStore;
