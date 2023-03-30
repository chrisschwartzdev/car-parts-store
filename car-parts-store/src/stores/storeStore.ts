import { create } from "zustand";
import { StoreService } from "../services/storeService";
import { Item, ItemSearchModel } from "../types";
import { querystring } from "zustand-querystring";

interface State {
  query?: string;
  items?: Item[];
  fetchItems: (search?: ItemSearchModel) => Promise<void>;
  resetQuery: VoidFunction;
}

const storeService = new StoreService();

const useStoreStore = create<State>(
  querystring<State, [], []>(
    set => ({
      query: "",
      items: undefined,
      fetchItems: async search => {
        set({ items: undefined, query: search?.query })
        const inventory = await storeService.getItems(search);
        set({ items: inventory.items })
      },
      resetQuery: () => set({ query: "" })
    }),
    {
      select(_: string) {
        return {
          query: true
        }
      }
    }))

export default useStoreStore;
