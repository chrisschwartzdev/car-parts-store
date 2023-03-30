import { rest } from "msw";
import { LoginRequest, Store, UserInfo } from "../types";

export const handlers = [
  rest.post("https://localhost:7024/user/login", async (req, res, ctx) => {
    const loginRequest = await req.json<LoginRequest>();
    return res(ctx.json<UserInfo>({ username: loginRequest.username }));
  }),
  rest.get("https://localhost:7024/store/items", async (_, res, ctx) => {
    return res(ctx.json<Store>({
      items: [
        {
          id: 0,
          name: "Beeg Turbo",
          cost: 1337,
          tags: []
        },
        {
          id: 1,
          name: "Some Item",
          cost: 1,
          tags: []
        },
        {
          id: 2,
          name: "Another Item",
          cost: 10_000,
          tags: []
        },
      ]
    }));
  }),
]