// spirometrie.js - rute pentru Spirometrie (tabelul spirometrie).
// In server.js: app.use("/spirometrie", require("./routes/spirometrie"));

const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/:cnp", async (req, res) => {
    try {
        const { cnp } = req.params;
        const result = await pool.query(
            "SELECT * FROM Spirometrie WHERE cnp = $1",
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
        const { cnp, data_spirometriei, fvc_l, fvc_proc, fev1_l, fev1_proc, fev1_fvc, interpretare, severitate } = req.body;
        const result = await pool.query(
            'INSERT INTO Spirometrie (cnp, data_spirometriei, fvc_l, fvc_proc, fev1_l, fev1_proc, fev1_fvc, interpretare, severitate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            [cnp, data_spirometriei, fvc_l, fvc_proc, fev1_l, fev1_proc, fev1_fvc, interpretare, severitate]
        )
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(400).json({ eroare: error.message });
    }
});

module.exports = router;
