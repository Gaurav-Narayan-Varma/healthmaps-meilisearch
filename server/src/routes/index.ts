import { z } from "zod";
import meteorites from "../data/meteorites.json" assert { type: "json" };
import { t } from "../trpc.js";
import { usersRouter } from "./users.js";

export const appRouter = t.router({
  meteorites: t.procedure.query(() => {
    return meteorites;
  }),
  // query procedure example
  sayHi: t.procedure.query(() => {
    return "Hi";
  }),
  // mutation procedure example
  logToServer: t.procedure.input(z.string()).mutation((req) => {
    console.log(`Client says: ${req.input}`);
    return "test";
  }),
  // nested procedure example
  users: usersRouter,
});
