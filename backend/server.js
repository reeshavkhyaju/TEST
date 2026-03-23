const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

console.log("Server file loaded ✔");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "testdb",
  password: "****",
  port: 5432,
});

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend is working ✅");
});

// POST API
app.post("/api/user", async (req, res) => {
  console.log("Request received:");
  console.log(req.body);

  const { name, phone, email } = req.body;

  try {
    await pool.query(
      "INSERT INTO users(name, phone, email) VALUES($1, $2, $3)",
      [name, phone, email]
    );

    res.send("Data saved to database ✅");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving data");
  }
});

// IMPORTANT: START SERVER
app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});