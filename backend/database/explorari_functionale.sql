-- ============================================================
-- SPIROMETRIE
-- ============================================================
CREATE TABLE Spirometrie (
    cnp VARCHAR(20) REFERENCES Pacienti (cnp) ON DELETE CASCADE,
    UNIQUE (cnp),
    data_spirometriei DATE,
    fvc_l NUMERIC(5, 2),
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
    CONSTRAINT check_severitate_spiro CHECK (
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
-- DLco
-- ============================================================
CREATE TABLE DLco (
    cnp VARCHAR(20) REFERENCES Pacienti (cnp) ON DELETE CASCADE,
    UNIQUE (cnp),
    data_efectuarii DATE,
    dlco_corr NUMERIC(5, 2),
    kco_proc NUMERIC(5, 2),
    severitate VARCHAR(20) CHECK (
        severitate IN (
            'normal',
            'scadere usoara',
            'scadere moderata',
            'scadere severa'
        )
    )
);

-- ============================================================
-- 6MWT (test de mers 6 minute)
-- ============================================================
CREATE TABLE Mwt6 (
    cnp VARCHAR(20) REFERENCES Pacienti (cnp) ON DELETE CASCADE,
    UNIQUE (cnp),
    data_efectuarii DATE,
    distanta_parcursa NUMERIC(6, 2),
    proc_distanta_prezisa NUMERIC(5, 2),
    spo2_initial SMALLINT CHECK (spo2_initial BETWEEN 0 AND 100),
    spo2_final SMALLINT CHECK (spo2_final BETWEEN 0 AND 100),
    borg_dispnee_initial SMALLINT CHECK (borg_dispnee_initial BETWEEN 1 AND 10),
    borg_dispnee_final SMALLINT CHECK (borg_dispnee_final BETWEEN 1 AND 10),
    borg_fatigabilitate_initial SMALLINT CHECK (borg_fatigabilitate_initial BETWEEN 1 AND 10),
    borg_fatigabilitate_final SMALLINT CHECK (borg_fatigabilitate_final BETWEEN 1 AND 10)
);



