const express = require("express");
const router = express.Router();

// almacenamiento en memoria
let favorites = [];

// GET /favorites → lista todos los favoritos
router.get("/", (req, res) => {
  res.json(favorites);
});

// POST /favorites → agrega un personaje a favoritos
router.post("/", (req, res) => {
  const character = req.body;

  // evitar duplicados
  if (!favorites.find(fav => fav.id === character.id)) {
    favorites.push(character);
  }

  res.json(favorites);
});

// DELETE /favorites/:id → elimina un favorito por id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  favorites = favorites.filter(fav => fav.id != id);
  res.json(favorites);
});

module.exports = router;
