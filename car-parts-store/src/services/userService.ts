import { post } from "../ajaxHelper";
import { LoginData, UserInfo } from "../types";

const loginUrl = "user/login";
const logoutUrl = "user/logout";

export class UserService {
  async login(loginRequest: LoginData): Promise<UserInfo> {
    const response = await post(loginUrl, loginRequest);

    if (!response.ok)
      throw Error('Login failed');

    return response.data;
  }
  async logout() {
    const response = await post(logoutUrl);
    if (!response.ok)
      throw Error('Failed to logout');
  }
}