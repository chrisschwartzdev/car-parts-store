import { create } from "zustand";
import { UserService } from "../services/userService";
import { LoginData, UserInfo } from "../types";


interface UserState {
  user: UserInfo | null;
  login: (loginRequest: LoginData) => void;
  logout: () => void;
}

const userService = new UserService();

const useUserStore = create<UserState>()(set => ({
  user: null,
  login: async (loginRequest) => {
    await userService.login(loginRequest)
      .then((user) => set((state) => ({
        ...state,
        user: user
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
