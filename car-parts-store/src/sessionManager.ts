import { UserInfo } from "./types";

export class SessionManager {
  private static Username = "USER_USERNAME";
  private static AuthLevel = "USER_AUTHLEVEL";

  static set(user: UserInfo) {
    sessionStorage.setItem(this.Username, user.username ?? '');
    sessionStorage.setItem(this.AuthLevel, user.authLevel?.toString() ?? '0');
  }
  static get(): UserInfo | null {
    const username = sessionStorage.getItem(this.Username);
    return !!username
      ? {
        username: username,
        authLevel: Number(sessionStorage.getItem(this.AuthLevel)) ?? 0
      }
      : null;
  }
  static clear() {
    sessionStorage.removeItem(this.Username);
    sessionStorage.removeItem(this.AuthLevel);
  }
}
