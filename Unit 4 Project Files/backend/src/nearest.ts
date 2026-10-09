import express from "express";
import { pool } from "./db";
import { geocode } from "./services/geocode";
import { displacementInKm } from "./services/distance";

const router = express.Router();

router.get("/nearest", async (req, res) => {
  try {
    const rawQuery = req.query.query?.toString();
    console.log("Query reached the backend: " + rawQuery)
    const userInput = `${rawQuery}, England`;

    const user = await geocode(userInput);
    console.log("User input geocoded: " + user)

    let shops;
    try {
      shops = await pool.query("SELECT * FROM locations");
    } catch (err: any) {
      console.log("Error querying DB:");
      console.error(err.message);
      return res.status(500).json({ error: "Database error" });
    }

    const nearest = shops.rows
    .map((shop) => ({
        name: shop.name,
        distanceKm: Number(
        displacementInKm(
            user.latitude,
            user.longitude,
            shop.latitude,
            shop.longitude
        ).toFixed(1)
        )
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, 8);
    res.json(nearest);
  } catch (err: any) {
    console.error(err.message);
  }
});

export default router;