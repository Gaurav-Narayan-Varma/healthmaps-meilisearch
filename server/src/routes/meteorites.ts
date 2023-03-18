import express from "express";
import meteorites from "../data/meteorites.json" assert { type: "json" };

const router = express.Router();

router.get("/", (req, res) => {
  res.header("Content-Type", "application/json");
  res.send(meteorites);
});

export default router;
