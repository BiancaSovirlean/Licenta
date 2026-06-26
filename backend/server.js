// server.js - punctul de pornire al aplicatiei.

// 1. Incarcam variabilele din .env in process.env.
//    Trebuie apelat primul, inainte sa folosim datele de conectare.
require("dotenv").config();

// 2. Importam Express (framework-ul de server) si pool-ul de baza de date.
const express = require("express");
const pool = require("./db");

// Importam routerul cu rutele de pacienti.
const pacientiRouter = require("./routes/pacienti");
const scoruriRouter = require("./routes/scoruri");
const spirometrieRouter = require("./routes/spirometrie");
const hrctRouter = require("./routes/hrct");

// 3. Cream aplicatia Express.
const app = express();

// 4. Middleware: ii spunem lui Express sa inteleaga JSON din cereri.
//    O sa ne ajute mai tarziu cand trimitem date de la formular.
app.use(express.json());

// 5. Ruta simpla de test, ca sa vedem ca serverul raspunde.
app.get("/", (req, res) => {
  res.send("Serverul functioneaza.");
});

// Agatam routerul: tot ce incepe cu /pacienti merge la pacientiRouter.
app.use("/pacienti", pacientiRouter);
app.use("/scoruri", scoruriRouter);
app.use("/spirometrie", spirometrieRouter);
app.use("/hrct", hrctRouter);

// 6. Ruta /health - verifica daca ne putem conecta la baza de date.
//    Rulam o interogare simpla (SELECT NOW()) care cere ora din DB.
//    Daca merge, baza de date e conectata corect.
app.get("/health", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      status: "ok",
      mesaj: "Conexiune la baza de date reusita",
      ora_db: result.rows[0].now,
    });
  } catch (error) {
    // Daca apare o eroare (parola gresita, DB oprita etc.) o trimitem inapoi.
    res.status(500).json({
      status: "error",
      mesaj: "Nu m-am putut conecta la baza de date",
      detalii: error.message,
    });
  }
});

// 7. Pornim serverul pe portul din .env (sau 3000 daca lipseste).
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server pornit pe http://localhost:${PORT}`);
});
