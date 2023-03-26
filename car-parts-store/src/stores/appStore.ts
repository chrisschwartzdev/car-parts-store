import { create } from "zustand";


interface AppState {
  modals: JSX.Element[];
  showModal: (modal: JSX.Element) => void;
  popModal: VoidFunction;
}

const useAppStore = create<AppState>()(set => ({
  modals: [],
  showModal: modal => {
    set(state => ({ modals: state.modals.concat([modal]) }))
  },
  popModal: () => {
    set(state => ({ modals: state.modals.slice(0, state.modals.length - 1) }))
  }
}))

export default useAppStore;
