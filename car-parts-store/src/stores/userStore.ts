import { create } from "zustand";
import { UserService } from "../services/userService";
import { SessionManager } from "../sessionManager";
import { LoginRequest, RegisterRequest, UserInfo } from "../types";
import SubscriptionManager, { SubscriptionModel } from "../utils/SubscriptionManager";

interface State extends SubscriptionModel {
  user: UserInfo | null;
  login: (request: LoginRequest) => Promise<void>;
  register: (request: RegisterRequest) => Promise<void>;
  logout: () => void;
  loadingState?: "login" | "register" | "logout";
}

const userService = new UserService();

const useUserStore = create<State>(set => {
  const sm = new SubscriptionManager(() => set({ loadingState: undefined }));
  return ({
    ...sm.getFunctions(),
    user: SessionManager.get(),
    login: async request => {
      set({ loadingState: "login" });
      return await userService.login(request)
        .then(user => {
          sm.publishResult();
          SessionManager.set(user);
          set({ user: user })
        })
        .catch(sm.publishResult)
    },
    register: async request => {
      set({ loadingState: "register" });
      return await userService.register(request)
        .then(() => sm.publishResult())
        .catch(sm.publishResult)
    },
    logout: async () => {
      set({ loadingState: "logout" });
      await userService.logout()
        .then(() => {
          sm.publishResult();
          set({ user: null })
        })
        .catch(sm.publishResult)
    }
  })
})

export default useUserStore;
