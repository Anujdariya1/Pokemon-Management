const express = require("express");
const app = express();
require("dotenv").config();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from "public"
app.use(express.static("public"));

// Set EJS as template engine
app.set("view engine", "ejs");

// Import routes
const trainerRoutes = require("./routes/trainers");
const pokemonRoutes = require("./routes/pokemons");

// Use routes
app.use("/trainers", trainerRoutes);
app.use("/pokemons", pokemonRoutes);

// Homepage route
app.get("/", (req, res) => {
  res.render("index"); // index.ejs
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
