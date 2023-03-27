import { create } from "zustand";
import { ModalComponent } from "../components/Modal/Modal";

interface AppState {
  modals: ModalComponent[];
  showModal: (modal: ModalComponent) => void;
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
