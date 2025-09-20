import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;

// Guardamos los favoritos en memoria (array simple)
let favorites = [];

// GET /characters
app.get("/characters", async (req, res) => {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json();

    // solo devolver los primeros 9
    res.json(data.results.slice(0, 9));
  } catch (error) {
    res.status(500).json({ error: "Error al obtener personajes" });
  }
});

// POST /favorites → agrega un favorito
app.post("/favorites", (req, res) => {
  const character = req.body;

  if (!character || !character.id) {
    return res.status(400).json({ error: "Personaje inválido" });
  }

  // evitar duplicados
  if (!favorites.find((fav) => fav.id === character.id)) {
    favorites.push(character);
  }

  res.json({ message: "Agregado a favoritos", favorites });
});

// GET /favorites → lista favoritos
app.get("/favorites", (req, res) => {
  res.json(favorites);
});

// EXTRA: DELETE /favorites/:id → eliminar favorito
app.delete("/favorites/:id", (req, res) => {
  const id = parseInt(req.params.id);
  favorites = favorites.filter((fav) => fav.id !== id);
  res.json({ message: "Eliminado de favoritos", favorites });
});

app.listen(PORT, () => {
  console.log(`Servidor esuchandoo en http://localhost:${PORT}`);
});
