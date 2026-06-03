-- ============================================================
-- REEVALUARE PERIODICA (1:many fata de pacient)
-- un pacient este reevaluat de mai multe ori in timp;
-- fiecare reevaluare are propria data, o spirometrie (inline, 1:1)
-- si germenii izolati la acea reevaluare (tabel copil, 1:many)
-- ============================================================
CREATE TABLE Reevaluare (
    id SERIAL PRIMARY KEY,
    cnp VARCHAR(20) REFERENCES Pacienti (cnp) ON DELETE CASCADE,
    data_reevaluare DATE,

    -- ===== spirometrie la reevaluare (inline, o singura per reevaluare) =====
    data_spirometriei DATE,
    fvc_l NUMERIC(5),
    fvc_proc NUMERIC(5, 2),
    fev1_l NUMERIC(5, 2),
    fev1_proc NUMERIC(5, 2),
    fev1_fvc NUMERIC(5, 2),
    interpretare VARCHAR(40) CHECK (
        interpretare IN (
            'functie pulmonara normala',
            'disfunctie ventilatorie mixta',
            'disfunctie ventilatorie obstructiva',
            'disfunctie ventilatorie restrictiva'
        )
    ),
    severitate VARCHAR(20) CHECK (
        severitate IN ('usoara', 'moderata', 'moderat-severa', 'severa')
    ),

    -- severitatea se completeaza doar daca exista o disfunctie;
    -- la 'functie pulmonara normala' (sau interpretare necompletata) ramane NULL
    CONSTRAINT check_severitate_reeval CHECK (
        (
            interpretare IS NOT NULL
            AND interpretare <> 'functie pulmonara normala'
            AND severitate IS NOT NULL
        )
        OR (
            (interpretare IS NULL OR interpretare = 'functie pulmonara normala')
            AND severitate IS NULL
        )
    )
);

-- ============================================================
-- GERMENI IZOLATI LA REEVALUARE (1:many fata de Reevaluare)
-- ============================================================
CREATE TABLE ReevaluareGermeni (
    id SERIAL PRIMARY KEY,
    reevaluare_id INT REFERENCES Reevaluare (id) ON DELETE CASCADE,
    germene VARCHAR(40) NOT NULL CHECK (
        germene IN (
            'Pseudomonas Aeruginosa',
            'Haemophilus Influenzae',
            'E. coli',
            'Streptococcus pneumoniae',
            'Staph. Aureus',
            'Klebsiella Pneumoniae',
            'Acinetobacter Baumannii',
            'Alti agenti patogeni',
            'Candida spp',
            'Aspergillus fumigatus'
        )
    ),
    procent NUMERIC(5, 2),
    sensibil BOOLEAN,
    multirezistenta BOOLEAN,
    -- acelasi germene nu poate aparea de doua ori la aceeasi reevaluare
    UNIQUE (reevaluare_id, germene)
);

