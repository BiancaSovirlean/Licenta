// routes/pacienti.js - rutele care se ocupa doar de pacienti.

const express = require("express");
const router = express.Router(); // un "mini-server" doar pentru pacienti
const pool = require("../db"); // ".." = urcam un folder, db.js e in backend/

// 1. GET /pacienti -> lista cu toti pacientii
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Pacienti ORDER BY nume");
    res.json(result.rows); // rows = lista de pacienti, o trimitem ca JSON
  } catch (error) {
    res.status(500).json({ eroare: error.message });
  }
});

// 2. GET /pacienti/:cnp -> un singur pacient dupa CNP
router.get("/:cnp", async (req, res) => {
  try {
    const { cnp } = req.params; // :cnp din adresa ajunge in req.params
    const result = await pool.query(
      "SELECT * FROM Pacienti WHERE cnp = $1",
      [cnp]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ eroare: "Pacientul nu a fost gasit" });
    }
    res.json(result.rows[0]); // un singur pacient, deci primul rand
  } catch (error) {
    res.status(500).json({ eroare: error.message });
  }
});

// 3. POST /pacienti -> adauga un pacient nou
router.post("/", async (req, res) => {
  try {
    // datele vin din formular, in req.body
    const {
      nume,
      prenume,
      cnp,
      data_diagnosticului,
      status_vital,
      data_decesului,
      cauza_decesului,
      inaltime,
      greutate,
      status_fumator,
      pachete_an_interval,
      expuneri_noxe_pulberi,
      noxe_pulberi_detaliat,
      expuneri_noxe_gaze_fumuri,
      expuneri_noxe_vapori_solventi,
    } = req.body;

    // NU trimitem sex, date_of_birth, imc (sunt GENERATED ALWAYS, le calculeaza
    // baza singura) si nici data_inregistrare (are DEFAULT CURRENT_DATE).
    const result = await pool.query(
      `INSERT INTO Pacienti (
        nume, prenume, cnp, data_diagnosticului, status_vital,
        data_decesului, cauza_decesului, inaltime, greutate,
        status_fumator, pachete_an_interval, expuneri_noxe_pulberi,
        noxe_pulberi_detaliat, expuneri_noxe_gaze_fumuri,
        expuneri_noxe_vapori_solventi
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
      RETURNING *`,
      [
        nume,
        prenume,
        cnp,
        data_diagnosticului,
        status_vital,
        data_decesului,
        cauza_decesului,
        inaltime,
        greutate,
        status_fumator,
        pachete_an_interval,
        expuneri_noxe_pulberi,
        noxe_pulberi_detaliat,
        expuneri_noxe_gaze_fumuri,
        expuneri_noxe_vapori_solventi,
      ]
    );
    res.status(201).json(result.rows[0]); // 201 = "creat cu succes"
  } catch (error) {
    res.status(400).json({ eroare: error.message });
  }
});

module.exports = router; // exportam routerul ca sa-l folosim in server.js
