import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";
import { appRouter } from "./routes/index.js";

// establishing connection and cors
const app = express();
// prettier-ignore
app.listen(1337, () => {console.log("Server started on port 1337")});
app.use(cors({ origin: "*" }));

// wiring routes
app.use("/trpc", createExpressMiddleware({ router: appRouter }));

export type AppRouter = typeof appRouter;
