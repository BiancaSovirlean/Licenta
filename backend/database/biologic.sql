-- ============================================================
-- BIOLOGIC (1:1 cu pacientul)
-- ============================================================
CREATE TABLE Biologic (
    cnp VARCHAR(20) REFERENCES Pacienti (cnp) ON DELETE CASCADE,
    UNIQUE (cnp),
    -- markeri inflamatori (numerice continue)
    leucocite NUMERIC(6, 2),
    pcr NUMERIC(6, 2),
    vsh NUMERIC(6, 2),
    -- status imunologic (categorii)
    fr VARCHAR(15) CHECK (fr IN ('negativ', 'pozitiv', 'fara valori')),
    a1_antitripsina VARCHAR(15) CHECK (
        a1_antitripsina IN ('negativ', 'pozitiv', 'fara valori')
    ),
    test_sudorii VARCHAR(15) CHECK (
        test_sudorii IN ('negativ', 'pozitiv', 'fara valori')
    ),
    -- electroforeza (valorile % se completeaza doar daca ELFO = da)
    elfo BOOLEAN DEFAULT FALSE,
    albumine NUMERIC(5, 2),
    a1_globuline NUMERIC(5, 2),
    a2_globuline NUMERIC(5, 2),
    b1_globuline NUMERIC(5, 2),
    b2_globuline NUMERIC(5, 2),
    g_globuline NUMERIC(5, 2),
    -- imunograma (valorile se completeaza doar daca Imunograma = da)
    imunograma BOOLEAN DEFAULT FALSE,
    iga NUMERIC(6, 2),
    igg NUMERIC(6, 2),
    igm NUMERIC(6, 2),
    ige_totale NUMERIC(8, 2),
    -- eozinofile (categorii)
    eozinofile VARCHAR(10) CHECK (
        eozinofile IN ('<0,1', '0,1-0,3', '>0,3')
    ),
    ige_aspergillus VARCHAR(10) CHECK (
        ige_aspergillus IN ('pozitiv', 'negativ')
    ),
    -- valorile electroforezei doar daca ELFO = da
    CONSTRAINT check_elfo CHECK (
        elfo = TRUE
        OR (
            albumine IS NULL
            AND a1_globuline IS NULL
            AND a2_globuline IS NULL
            AND b1_globuline IS NULL
            AND b2_globuline IS NULL
            AND g_globuline IS NULL
        )
    ),
    -- valorile imunogramei doar daca Imunograma = da
    CONSTRAINT check_imunograma CHECK (
        imunograma = TRUE
        OR (
            iga IS NULL
            AND igg IS NULL
            AND igm IS NULL
            AND ige_totale IS NULL
        )
    )
);


