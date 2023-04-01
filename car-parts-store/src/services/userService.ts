import { apiPost } from "../apiHelper";
import { SessionManager } from "../sessionManager";
import { LoginRequest, RegisterRequest, UserInfo } from "../types";

const loginUrl = "user/login";
const logoutUrl = "user/logout";
const registerUrl = "user/register";

export const validateLogin = <T extends RegisterRequest | LoginRequest>({ username, password }: Partial<T>) => {
  if ((username || '').length < 4)
    return false;
  if ((password || '').length < 6)
    return false;
  return true;
}

export class UserService {
  static isUserAdmin(user: UserInfo | null) {
    return (user?.authLevel ?? 0) >= 2;
  }
  async login(request: LoginRequest): Promise<UserInfo> {
    const response = await apiPost(loginUrl, request);
    return response.data;
  }
  async register(request: RegisterRequest) {
    await apiPost(registerUrl, request);
  }
  async logout() {
    await apiPost(logoutUrl);
    SessionManager.clear();
  }
}