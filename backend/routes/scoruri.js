// routes/scoruri.js - rute pentru Scoruri (tabelul scoruri).
// Scoruri de severitate, ex. BACI.
// Schelet gol: adauga aici rutele cand lucram la aceasta sectiune.
// In server.js: app.use("/scoruri", require("./routes/scoruri"));

const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/:cnp", async (req, res) => {
    try {
        const { cnp } = req.params;
        const result = await pool.query(
            "SELECT * FROM Scoruri WHERE cnp = $1",
            [cnp]
        )
        if (result.rows.length === 0) {
            return res.status(404).json({ eroare: "Pacientul nu a fost gasit" });
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        res.status(500).json({ eroare: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const {
            cnp,
            bsi_severitate,
            faced_severitate
        }= req.body;
        const result = await pool.query(
            'INSERT INTO Scoruri (cnp, bsi_severitate, faced_severitate) VALUES ($1, $2, $3) RETURNING *',
            [cnp, bsi_severitate, faced_severitate]
        )
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(400).json({ eroare: error.message });
    }
});
module.exports = router;
