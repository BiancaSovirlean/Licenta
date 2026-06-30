// routes/hrct.js - rute pentru Imagistica HRCT (tabelul hrct).
// Detalii pe lobi/plamani, tip de bronsiectazii, semne asociate.
// Schelet gol: adauga aici rutele cand lucram la aceasta sectiune.
// In server.js: app.use("/hrct", require("./routes/hrct"));

const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/:cnp", async (req, res) => {
    try {
        const { cnp } = req.params;
        const result = await pool.query(
            "SELECT * FROM HRCT WHERE cnp = $1",
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
        const { cnp, data_efectuarii, nr_lobi_afectati, tip_predominant, drept_superior, drept_mediu, drept_inferior, stang_superior, stang_mediu, stang_inferior, distributie_lateralitate, tree_in_bud, emfizem, fibroza_interstitiala, noduli_pulmonari, cavitati, distributie_zona } = req.body;
        const result = await pool.query(
            `INSERT INTO HRCT (
            cnp, data_efectuarii, nr_lobi_afectati, tip_predominant, drept_superior,drept_mediu,drept_inferior,stang_superior,stang_mediu,stang_inferior,distributie_lateralitate,tree_in_bud,emfizem,fibroza_interstitiala,noduli_pulmonari,cavitati,distributie_zona
            ) VALUES (
             $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *`,
            [cnp, data_efectuarii, nr_lobi_afectati, tip_predominant, drept_superior, drept_mediu, drept_inferior, stang_superior, stang_mediu, stang_inferior, distributie_lateralitate, tree_in_bud, emfizem, fibroza_interstitiala, noduli_pulmonari, cavitati, distributie_zona]
        )
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(400).json({ eroare: error.message });
    }
});


module.exports = router;
