const express = require("express");
const router = express.Router();
const pokemonController = require("../controllers/pokemonController");

// List all pokemons
router.get("/", pokemonController.getAllPokemons);

// Show form to add a pokemon
router.get("/add", pokemonController.showAddPokemonForm);

// Handle form submission to add a pokemon
router.post("/add", pokemonController.addPokemon);

// Delete a pokemon
router.post("/delete/:id", pokemonController.deletePokemon);

module.exports = router;
