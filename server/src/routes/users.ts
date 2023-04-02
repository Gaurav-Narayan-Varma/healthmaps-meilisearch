import { t } from "../trpc.js";

export const usersRouter = t.router({
  getUser: t.procedure.query(() => {
    return { id: 1, name: "Jerry" };
  }),
});
