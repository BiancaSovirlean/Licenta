-- ============================================================
-- EXACERBARI (1:many fata de pacient)
-- un pacient poate avea mai multe exacerbari in timp;
-- ============================================================
CREATE TABLE Exacerbari (
    id SERIAL PRIMARY KEY,
    cnp VARCHAR(20) REFERENCES Pacienti (cnp) ON DELETE CASCADE,

    -- data exacerbarii ca DATE (ziua fixata la 01, formatul cerut e MM.YYYY)
    data_exacerbarii DATE,

    -- severitate (categorii)
    severitate VARCHAR(10) CHECK (
        severitate IN ('usoara', 'moderata', 'severa')
    ),

    -- izolare agent patogen (boolean parinte + sub-optiuni cu gate)
    izolare_agent BOOLEAN DEFAULT FALSE,
    izo_pseudomonas BOOLEAN DEFAULT FALSE,
    izo_altele BOOLEAN DEFAULT FALSE,

    -- tratament antibiotic
    atb_tip VARCHAR(15) CHECK (
        atb_tip IN ('oral', 'iv', 'inhalator', 'mixt')
    ),
    atb_durata VARCHAR(15) CHECK (
        atb_durata IN ('5-7 zile', '7-14 zile', '>14 zile')
    ),

    -- corticoterapie sistemica
    corticoterapie_sistemica BOOLEAN DEFAULT FALSE,

    -- sub-optiunile de izolare doar daca s-a izolat un agent
    CONSTRAINT check_izolare_agent CHECK (
        izolare_agent = TRUE
        OR NOT (izo_pseudomonas OR izo_altele)
    )
);

-- ============================================================
-- VIEW: numar exacerbari pe pacient si pe an
-- ============================================================
CREATE VIEW v_exacerbari_pe_an AS
SELECT
    cnp,
    EXTRACT(YEAR FROM data_exacerbarii) AS an,
    COUNT(*) AS numar_exacerbari
FROM Exacerbari
WHERE data_exacerbarii IS NOT NULL
GROUP BY cnp, EXTRACT(YEAR FROM data_exacerbarii);

-- ============================================================
-- VIEW: durata (in zile) dintre exacerbari consecutive
-- pentru fiecare exacerbare, distanta fata de cea anterioara
-- a aceluiasi pacient (LAG peste datele ordonate)
-- ============================================================
CREATE VIEW v_durata_intre_exacerbari AS
SELECT
    cnp,
    data_exacerbarii,
    LAG(data_exacerbarii) OVER (
        PARTITION BY cnp ORDER BY data_exacerbarii
    ) AS exacerbarea_anterioara,
    data_exacerbarii - LAG(data_exacerbarii) OVER (
        PARTITION BY cnp ORDER BY data_exacerbarii
    ) AS zile_de_la_anterioara
FROM Exacerbari
WHERE data_exacerbarii IS NOT NULL;


