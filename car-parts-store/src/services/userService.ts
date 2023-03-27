import { apiPost } from "../apiHelper";
import { LoginRequest, RegisterRequest, UserInfo } from "../types";

const loginUrl = "user/login";
const logoutUrl = "user/logout";
const registerUrl = "user/register";

export class UserService {
  static isUserAdmin(user: UserInfo | null) {
    return (user?.authLevel ?? 0) >= 2;
  }
  async login(request: LoginRequest): Promise<UserInfo> {
    const response = await apiPost(loginUrl, request);

    if (!response.ok)
      throw Error('Login failed');

    return response.data;
  }
  async register(request: RegisterRequest) {
    const response = await apiPost(registerUrl, request);
    if (!response.ok)
      throw Error('Failed to register');
  }
  async logout() {
    const response = await apiPost(logoutUrl);
    if (!response.ok)
      throw Error('Failed to logout');
  }
}