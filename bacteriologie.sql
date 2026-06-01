-- ============================================================
-- BACTERIOLOGIE (1:1 cu pacientul)
-- ============================================================
CREATE TABLE Bacteriologie (
    cnp VARCHAR(20) REFERENCES Pacienti (cnp) ON DELETE CASCADE,
    UNIQUE (cnp),
    data_recoltarii DATE,
    produs_biologic VARCHAR(20) CHECK (
        produs_biologic IN ('sputa', 'aspirat bronsic', 'LBA')
    ),
    -- colonizare: >=2 culturi pozitive la >3 luni intr-un an
    colonizare VARCHAR(20) CHECK (
        colonizare IN ('pseudomonas', 'alt patogen')
    ),
    utilizare_antifungice BOOLEAN DEFAULT FALSE
);

-- ============================================================
-- GERMENI IZOLATI (1:many fata de Bacteriologie)
-- ============================================================
CREATE TABLE Germeni (
    id SERIAL PRIMARY KEY,
    bacteriologie_cnp VARCHAR(20) REFERENCES Bacteriologie (cnp) ON DELETE CASCADE,
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
    -- antibioterapie de eradicare pentru acest germene
    eradicare VARCHAR(15) CHECK (
        eradicare IN ('da', 'nu', 'nu e cazul')
    ),
    eradicare_antibiotic VARCHAR(20) CHECK (
        eradicare_antibiotic IN (
            'florochinolone', 'cefalosporine', 'aminoglicozide',
            'macrolide', 'carbapeneme', 'altele'
        )
    ),
    eradicare_administrare VARCHAR(15) CHECK (
        eradicare_administrare IN ('oral', 'inhalator')
    ),
    eradicare_durata VARCHAR(15) CHECK (
        eradicare_durata IN ('10-14 zile', '14-21', '21-28', 'a la long')
    ),
    -- acelasi germene nu poate aparea de doua ori la aceeasi analiza
    UNIQUE (bacteriologie_cnp, germene),
    -- detaliile de eradicare se completeaza doar daca eradicare = 'da'
    CONSTRAINT check_eradicare CHECK (
        eradicare = 'da'
        OR (
            eradicare_antibiotic IS NULL
            AND eradicare_administrare IS NULL
            AND eradicare_durata IS NULL
        )
    )
);



