import { post } from "../ajaxHelper";
import { LoginRequest, RegisterRequest, UserInfo } from "../types";

const loginUrl = "user/login";
const logoutUrl = "user/logout";
const registerUrl = "user/register";

export class UserService {
  async login(request: LoginRequest): Promise<UserInfo> {
    const response = await post(loginUrl, request);

    if (!response.ok)
      throw Error('Login failed');

    return response.data;
  }
  async register(request: RegisterRequest) {
    const response = await post(registerUrl, request);
    if (!response.ok)
      throw Error('Failed to register');
  }
  async logout() {
    const response = await post(logoutUrl);
    if (!response.ok)
      throw Error('Failed to logout');
  }
}