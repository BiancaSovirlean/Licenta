-- ============================================================
-- SCORURI / CHESTIONARE (1:1 cu pacientul)
-- ============================================================
CREATE TABLE Scoruri (
    cnp VARCHAR(20) REFERENCES Pacienti (cnp) ON DELETE CASCADE,
    UNIQUE (cnp),

    -- BSI (Bronchiectasis Severity Index)
    -- banda de severitate; sever = 9+ puncte
    bsi_severitate VARCHAR(10) CHECK (
        bsi_severitate IN ('0-4 pct', '5-8 pct', '>=9 pct')
    ),

    -- FACED
    faced_severitate VARCHAR(10) CHECK (
        faced_severitate IN ('0-2 pct', '3-4 pct', '5-7 pct')
    )
);

