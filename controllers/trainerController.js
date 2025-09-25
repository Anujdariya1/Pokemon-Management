const pool = require("../db");

// Read
exports.getAllTrainers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM trainers");
    res.render("trainers", { trainers: result.rows });
  } catch (err) {
    console.error(err);
    res.send("Error fetching trainers");
  }
};

exports.showAddTrainerForm = (req, res) => {
  res.render("add-trainer");
};

// Write
exports.addTrainer = async (req, res) => {
  const { name, region } = req.body;
  try {
    await pool.query("INSERT INTO trainers (name, region) VALUES ($1, $2)", [name, region]);
    res.redirect("/trainers");
  } catch (err) {
    console.error(err);
    res.send("Error adding trainer");
  }
};

// Delete
exports.deleteTrainer = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM trainers WHERE trainer_id = $1", [id]);
    res.redirect("/trainers");
  } catch (err) {
    console.error(err);
    res.send("Error deleting trainer");
  }
};
