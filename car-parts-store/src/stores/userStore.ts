import { create } from "zustand";
import { UserService } from "../services/userService";
import { LoginRequest, RegisterRequest, UserInfo } from "../types";


interface UserState {
  user: UserInfo | null;
  login: (request: LoginRequest) => void;
  register: (request: RegisterRequest) => void;
  logout: () => void;
  registerSent: boolean;
}

const userService = new UserService();

const useUserStore = create<UserState>()(set => ({
  user: null,
  registerSent: false,
  login: async request => {
    await userService.login(request)
      .then(user => set(state => ({
        ...state,
        user: user
      })))
  },
  register: async request => {
    await userService.register(request)
      .then(() => set(state => ({
        ...state,
        registerSent: true
      })))
  },
  logout: async () => {
    await userService.logout()
      .then(() => set((state) => ({
        ...state,
        user: null
      })))
  }
}))

export default useUserStore;
