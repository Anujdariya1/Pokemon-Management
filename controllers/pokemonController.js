const pool = require("../db");

// Get all Pokemons
exports.getAllPokemons = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.pokemon_id, p.name, p.level, t.name AS type, tr.name AS trainer
      FROM pokemons p
      JOIN types t ON p.type_id = t.type_id
      JOIN trainers tr ON p.trainer_id = tr.trainer_id;
    `);
    res.render("pokemons", { pokemons: result.rows });
  } catch (err) {
    console.error("Error in getAllPokemons:", err);
    res.send("Error fetching pokemons");
  }
};

// Show add form
exports.showAddPokemonForm = async (req, res) => {
  try {
    const typesResult = await pool.query("SELECT * FROM types");
    const trainersResult = await pool.query("SELECT * FROM trainers");

    res.render("add-pokemon", {
      types: typesResult.rows,
      trainers: trainersResult.rows
    });
  } catch (err) {
    console.error("Error loading add-pokemon form:", err);
    res.send("Error loading form");
  }
};

// Add pokemon
exports.addPokemon = async (req, res) => {
  const { name, level, type_id, trainer_id } = req.body;
  try {
    await pool.query(
      "INSERT INTO pokemons (name, level, type_id, trainer_id) VALUES ($1, $2, $3, $4)",
      [name, level, type_id, trainer_id]
    );
    res.redirect("/pokemons");
  } catch (err) {
    console.error("Error in addPokemon:", err);
    res.send("Error adding pokemon");
  }
};

// Delete pokemon
exports.deletePokemon = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM pokemons WHERE pokemon_id = $1", [id]);
    res.redirect("/pokemons");
  } catch (err) {
    console.error("Error in deletePokemon:", err);
    res.send("Error deleting pokemon");
  }
};
