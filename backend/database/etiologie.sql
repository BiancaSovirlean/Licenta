CREATE TABLE Etiologie (
    cnp VARCHAR(20) REFERENCES Pacienti (cnp) ON DELETE CASCADE,
    UNIQUE (cnp),
    etiologie_diagnosticata BOOLEAN NOT NULL,
    idiopatica BOOLEAN DEFAULT FALSE,
    postinfectioasa BOOLEAN DEFAULT FALSE,
    inf_bacteriana BOOLEAN DEFAULT FALSE,
    inf_tuberculoasa BOOLEAN DEFAULT FALSE,
    inf_virala BOOLEAN DEFAULT FALSE,
    inf_respiratorii_copilarie BOOLEAN DEFAULT FALSE,
    imunodeficienta BOOLEAN DEFAULT FALSE,
    imuno_primara BOOLEAN DEFAULT FALSE,
    imuno_secundara BOOLEAN DEFAULT FALSE,
    obstructiva BOOLEAN DEFAULT FALSE,
    obstr_corp_strain BOOLEAN DEFAULT FALSE,
    obstr_tumora BOOLEAN DEFAULT FALSE,
    obstr_stenoza BOOLEAN DEFAULT FALSE,
    boli_tesut_conjunctiv BOOLEAN DEFAULT FALSE,
    tc_poliartrita BOOLEAN DEFAULT FALSE,
    tc_lupus BOOLEAN DEFAULT FALSE,
    tc_sjogren BOOLEAN DEFAULT FALSE,
    tc_vasculite BOOLEAN DEFAULT FALSE,
    tc_sclerodermie BOOLEAN DEFAULT FALSE,
    tc_boli_intestinale BOOLEAN DEFAULT FALSE,
    tc_altele BOOLEAN DEFAULT FALSE,
    defecte_congenitale BOOLEAN DEFAULT FALSE,
    cong_alfa1 BOOLEAN DEFAULT FALSE,
    cong_diskinezie BOOLEAN DEFAULT FALSE,
    cong_altele BOOLEAN DEFAULT FALSE,
    post_inhalare_toxice BOOLEAN DEFAULT FALSE,
    alte_categorii BOOLEAN DEFAULT FALSE,
    alte_tractiune BOOLEAN DEFAULT FALSE,
    alte_post_transplant BOOLEAN DEFAULT FALSE,
    alte_altele BOOLEAN DEFAULT FALSE,
    an_diagnostic_etiologic INT CHECK (an_diagnostic_etiologic >= 1900),
    CONSTRAINT check_poarta_etiologie CHECK (
        etiologie_diagnosticata = TRUE
        OR NOT (
            idiopatica
            OR postinfectioasa
            OR imunodeficienta
            OR obstructiva
            OR boli_tesut_conjunctiv
            OR defecte_congenitale
            OR post_inhalare_toxice
            OR alte_categorii
        )
    ),
    CONSTRAINT check_postinfectioasa CHECK (
        postinfectioasa = TRUE
        OR NOT (
            inf_bacteriana
            OR inf_tuberculoasa
            OR inf_virala
            OR inf_respiratorii_copilarie
        )
    ),
    CONSTRAINT check_imunodeficienta CHECK (
        imunodeficienta = TRUE
        OR NOT (
            imuno_primara
            OR imuno_secundara
        )
    ),
    CONSTRAINT check_obstructiva CHECK (
        obstructiva = TRUE
        OR NOT (
            obstr_corp_strain
            OR obstr_tumora
            OR obstr_stenoza
        )
    ),
    CONSTRAINT check_boli_tesut_conjunctiv CHECK (
        boli_tesut_conjunctiv = TRUE
        OR NOT (
            tc_poliartrita
            OR tc_lupus
            OR tc_sjogren
            OR tc_vasculite
            OR tc_sclerodermie
            OR tc_boli_intestinale
            OR tc_altele
        )
    ),
    CONSTRAINT check_defecte_congenitale CHECK (
        defecte_congenitale = TRUE
        OR NOT (
            cong_alfa1
            OR cong_diskinezie
            OR cong_altele
        )
    ),
    CONSTRAINT check_alte_categorii CHECK (
        alte_categorii = TRUE
        OR NOT (
            alte_tractiune
            OR alte_post_transplant
            OR alte_altele
        )
    ),
    CONSTRAINT check_an_etiologic CHECK (
        an_diagnostic_etiologic IS NULL
        OR an_diagnostic_etiologic BETWEEN 1900 AND EXTRACT(
            YEAR
            FROM
                CURRENT_DATE
        )
    )
);

