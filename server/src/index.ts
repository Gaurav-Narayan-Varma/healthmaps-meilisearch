import cors from "cors";
import express from "express";
import meteoritesRouter from "./routes/meteorites.js";
import customersRouter from "./routes/customers.js";

const app = express();

app.use(
  cors({
    origin: "http://127.0.0.1:5173",
  })
);

app.listen(1337, () => {
  console.log("Server started on port 1337");
});

app.use("/customers", customersRouter);
app.use("/meteorites", meteoritesRouter);
