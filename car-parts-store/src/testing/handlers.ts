import { rest } from "msw";
import { LoginRequest, UserInfo } from "../types";

export const handlers = [
  rest.post("https://localhost:7024/user/login", async (req, res, ctx) => {
    const loginRequest = await req.json<LoginRequest>();
    return res(ctx.json<UserInfo>({ username: loginRequest.username }));
  }),
]