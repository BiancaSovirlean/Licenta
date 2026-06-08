// routes/dashboard.js - rute pentru statistici agregate (tablou de bord).
// Impartire pe sexe, grupe de varsta, tipuri de colonizari (Pseudomonas etc.).
// Nu corespunde unui singur tabel: aici vor sta interogari care aadauga date din mai multe tabele.
// Schelet gol: adauga aici rutele cand lucram la dashboard.
// In server.js: app.use("/dashboard", require("./routes/dashboard"));

const express = require("express");
const router = express.Router();
const pool = require("../db");

// TODO: rute pentru statistici dashboard

module.exports = router;
