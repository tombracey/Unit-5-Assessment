import express from "express";
import { pool } from "./db";
import nearestRouter from "./nearest";
import cors from "cors";

const app = express();
const port = 3001;
app.use(cors());

app.get("/locations", async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM locations");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.use("/", nearestRouter);

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});