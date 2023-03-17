import express from "express";
import cors from "cors";
import meteorites from "../meteorites.json" assert { type: "json" };
import axios from "axios";

const app = express();

app.use(
  cors({
    origin: "http://127.0.0.1:5173",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(1337, () => {
  console.log("Server started on port 1337");
});

app.get("/", (req, res) => {
  res.header("Content-Type", "application/json");
  res.send(meteorites);
});

app.get("/csv", (req, res) => {
  axios
    .get("https://sample-videos.com/csv/Sample-Spreadsheet-100-rows.csv")
    .then((data) => console.log(data.data))
    .catch((err) => console.log(err));
});
