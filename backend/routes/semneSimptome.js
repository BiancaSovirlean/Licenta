// routes/semneSimptome.js - rute pentru Semne si simptome (tabelul semne_simptome).
// Tuse, sputa (Murray), dispnee (mMRC), fatigabilitate (Borg), hemoptizie, examen obiectiv.
// Relatie 1:1 cu pacientul (UNIQUE(cnp)): un singur set de semne la prezentare.
// In server.js: app.use("/semne-simptome", require("./routes/semneSimptome"));

const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET /semne-simptome/:cnp - aducem setul de semne/simptome al unui pacient
router.get("/:cnp", async (req, res) => {
    try {
        const { cnp } = req.params;
        const result = await pool.query(
            "SELECT * FROM SemneSimptome WHERE cnp = $1",
            [cnp]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ eroare: "Pacientul nu a fost gasit" });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ eroare: error.message });
    }
});

// POST /semne-simptome - introducem semnele/simptomele unui pacient
router.post("/", async (req, res) => {
    try {
        const {
            cnp,
            status_simptomatologie,
            tuse, tuse_tip, tuse_murray, tuse_cantitate,
            dispnee, dispnee_mmrc,
            fatigabilitate, fatigabilitate_borg,
            hemoptizie, hemoptizie_grad,
            scadere_ponderala, febra, wheezing, cianoza, degete_hipocratice,
            stetacustic_normal, stetacustic_tip,
        } = req.body;

        const result = await pool.query(
            `INSERT INTO SemneSimptome (
                cnp, status_simptomatologie,
                tuse, tuse_tip, tuse_murray, tuse_cantitate,
                dispnee, dispnee_mmrc,
                fatigabilitate, fatigabilitate_borg,
                hemoptizie, hemoptizie_grad,
                scadere_ponderala, febra, wheezing, cianoza, degete_hipocratice,
                stetacustic_normal, stetacustic_tip
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
                $11, $12, $13, $14, $15, $16, $17, $18, $19
            ) RETURNING *`,
            [
                cnp, status_simptomatologie,
                tuse, tuse_tip, tuse_murray, tuse_cantitate,
                dispnee, dispnee_mmrc,
                fatigabilitate, fatigabilitate_borg,
                hemoptizie, hemoptizie_grad,
                scadere_ponderala, febra, wheezing, cianoza, degete_hipocratice,
                stetacustic_normal, stetacustic_tip,
            ]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(400).json({ eroare: error.message });
    }
});

module.exports = router;
