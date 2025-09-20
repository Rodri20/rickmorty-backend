const express = require("express");
const router = express.Router();

// GET /characters → obtiene personajes desde Rick and Morty API
router.get("/", async (req, res) => {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json();

    res.json(data.results);
  } catch (error) {
    console.error("Error al obtener personajes:", error);
    res.status(500).json({ error: "Error al obtener personajes" });
  }
});

module.exports = router;
