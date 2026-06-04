CREATE TABLE HRCT (
    cnp VARCHAR(20) REFERENCES Pacienti (cnp) ON DELETE CASCADE,
    UNIQUE (cnp),
    data_efectuarii INT CHECK (
        data_efectuarii BETWEEN 1900 AND EXTRACT(YEAR FROM CURRENT_DATE)
    ),
    nr_lobi_afectati VARCHAR(10) CHECK (
        nr_lobi_afectati IN ('1', '2 sau 3', '>3')
    ),
    tip_predominant VARCHAR(20) CHECK (
        tip_predominant IN ('cilindrice', 'varicoase', 'chistice')
    ),
    -- tip bronsiectazii per lob (NULL = lob neafectat)
    -- plaman drept
    drept_superior VARCHAR(20) CHECK (
        drept_superior IN ('cilindrice', 'varicoase', 'chistice')
    ),
    drept_mediu VARCHAR(20) CHECK (
        drept_mediu IN ('cilindrice', 'varicoase', 'chistice')
    ),
    drept_inferior VARCHAR(20) CHECK (
        drept_inferior IN ('cilindrice', 'varicoase', 'chistice')
    ),
    -- plaman stang
    stang_superior VARCHAR(20) CHECK (
        stang_superior IN ('cilindrice', 'varicoase', 'chistice')
    ),
    stang_mediu VARCHAR(20) CHECK (
        stang_mediu IN ('cilindrice', 'varicoase', 'chistice')
    ),
    stang_inferior VARCHAR(20) CHECK (
        stang_inferior IN ('cilindrice', 'varicoase', 'chistice')
    ),
    -- distributie predominanta (doua niveluri)
    distributie_lateralitate VARCHAR(20) CHECK (
        distributie_lateralitate IN ('unilaterala', 'bilaterala')
    ),
    distributie_zona VARCHAR(20) CHECK (
        distributie_zona IN ('superior', 'inferior', 'difuz')
    ),
    -- semne asociate (da/nu)
    tree_in_bud BOOLEAN DEFAULT FALSE,
    emfizem BOOLEAN DEFAULT FALSE,
    fibroza_interstitiala BOOLEAN DEFAULT FALSE,
    noduli_pulmonari BOOLEAN DEFAULT FALSE,
    cavitati BOOLEAN DEFAULT FALSE
);


