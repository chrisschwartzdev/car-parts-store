
export interface RegisterRequest {
  username: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export enum AuthLevel {
  Undefined,
  User,
  Admin
}

export interface UserInfo {
  username?: string;
  authLevel?: AuthLevel;
  sessionToken?: string;
}

export enum ItemTag {
  Intake,
  Exhaust,
  Fueling,
  BoltOn,
  Turbo
}

export interface Item {
  id: number;
  name: string;
  cost: number;
  tags: ItemTag[]
}