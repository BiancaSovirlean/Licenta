DROP TABLE IF EXISTS Germeni CASCADE;
DROP TABLE IF EXISTS Bacteriologie CASCADE;

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
    -- antibioterapie eradicare Pseudomonas
    eradicare_pseudo VARCHAR(15) CHECK (
        eradicare_pseudo IN ('da', 'nu', 'nu e cazul')
    ),
    eradicare_pseudo_antibiotic VARCHAR(20) CHECK (
        eradicare_pseudo_antibiotic IN (
            'florochinolone', 'cefalosporine', 'aminoglicozide',
            'macrolide', 'carbapeneme', 'altele'
        )
    ),
    eradicare_pseudo_administrare VARCHAR(15) CHECK (
        eradicare_pseudo_administrare IN ('oral', 'inhalator')
    ),
    eradicare_pseudo_durata VARCHAR(15) CHECK (
        eradicare_pseudo_durata IN ('10-14 zile', '14-21', '21-28', 'a la long')
    ),
    -- antibioterapie eradicare alt patogen
    eradicare_alt VARCHAR(15) CHECK (
        eradicare_alt IN ('da', 'nu', 'nu e cazul')
    ),
    eradicare_alt_antibiotic VARCHAR(20) CHECK (
        eradicare_alt_antibiotic IN (
            'florochinolone', 'cefalosporine', 'aminoglicozide',
            'macrolide', 'carbapeneme', 'altele'
        )
    ),
    eradicare_alt_administrare VARCHAR(15) CHECK (
        eradicare_alt_administrare IN ('oral', 'inhalator')
    ),
    eradicare_alt_durata VARCHAR(15) CHECK (
        eradicare_alt_durata IN ('10-14 zile', '14-21', '21-28', 'a la long')
    ),
    utilizare_antifungice BOOLEAN DEFAULT FALSE,
    -- detaliile de eradicare se completeaza doar daca eradicarea = 'da'
    CONSTRAINT check_eradicare_pseudo CHECK (
        eradicare_pseudo = 'da'
        OR (
            eradicare_pseudo_antibiotic IS NULL
            AND eradicare_pseudo_administrare IS NULL
            AND eradicare_pseudo_durata IS NULL
        )
    ),
    CONSTRAINT check_eradicare_alt CHECK (
        eradicare_alt = 'da'
        OR (
            eradicare_alt_antibiotic IS NULL
            AND eradicare_alt_administrare IS NULL
            AND eradicare_alt_durata IS NULL
        )
    )
);

-- ============================================================
-- GERMENI IZOLATI (1:many fata de Bacteriologie)
-- un rand per germene gasit la analiza
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
    -- acelasi germene nu poate aparea de doua ori la aceeasi analiza
    UNIQUE (bacteriologie_cnp, germene)
);


