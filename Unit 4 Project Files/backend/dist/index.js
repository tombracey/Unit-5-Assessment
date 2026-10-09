"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const nearest_1 = __importDefault(require("./nearest"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3001;
app.use((0, cors_1.default)());
app.get("/locations", async (_req, res) => {
    try {
        const result = await db_1.pool.query("SELECT * FROM locations");
        res.json(result.rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});
app.use("/", nearest_1.default);
app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
});
