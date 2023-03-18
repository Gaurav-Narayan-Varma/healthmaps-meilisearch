import axios from "axios";
import csv from "csvtojson";
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  axios
    .get("https://sample-videos.com/csv/Sample-Spreadsheet-100-rows.csv")
    .then((data) => {
      csv({
        noheader: true,
        headers: [
          "index",
          "product(s)",
          "name",
          "count",
          "coordinates",
          "price",
          "zipcode",
          "location",
          "category",
          "rating",
        ],
        // output: "csv",
      })
        .fromString(data.data)
        .then((data) => {
          let page = req.query.page;
          let limit: any = req.query.limit;

          data = data.splice(0, limit);

          res.header("Content-Type", "application/json");
          res.send(data);
        });
    })
    .catch((err) => console.log(err));
});

export default router;
