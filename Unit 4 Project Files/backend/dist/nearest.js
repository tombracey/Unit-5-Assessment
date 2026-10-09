"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const geocode_1 = require("./services/geocode");
const distance_1 = require("./services/distance");
const router = express_1.default.Router();
router.get("/nearest", async (req, res) => {
    try {
        const rawQuery = req.query.query?.toString();
        console.log("Query reached the backend: " + rawQuery);
        const userInput = `${rawQuery}, England`;
        const user = await (0, geocode_1.geocode)(userInput);
        console.log("User input geocoded: " + user);
        let shops;
        try {
            shops = await db_1.pool.query("SELECT * FROM locations");
        }
        catch (err) {
            console.log("Error querying DB:");
            console.error(err.message);
            return res.status(500).json({ error: "Database error" });
        }
        const nearest = shops.rows
            .map((shop) => ({
            name: shop.name,
            distanceKm: Number((0, distance_1.displacementInKm)(user.latitude, user.longitude, shop.latitude, shop.longitude).toFixed(1))
        }))
            .sort((a, b) => a.distanceKm - b.distanceKm)
            .slice(0, 8);
        res.json(nearest);
    }
    catch (err) {
        console.error(err.message);
    }
});
exports.default = router;
