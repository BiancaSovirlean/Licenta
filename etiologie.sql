CREATE TABLE Etiologie (
    cnp VARCHAR(20) REFERENCES Pacienti (cnp) ON DELETE CASCADE,
    UNIQUE (cnp),
    etiologie_diagnosticata BOOLEAN NOT NULL,
    idiopatica BOOLEAN,
    postinfectioasa BOOLEAN,
    inf_bacteriana BOOLEAN,
    inf_tuberculoasa BOOLEAN,
    inf_virala BOOLEAN,
    inf_respiratorii_copilarie BOOLEAN,
    imunodeficienta BOOLEAN,
    imuno_primara BOOLEAN,
    imuno_secundara BOOLEAN,
    obstructiva BOOLEAN,
    obstr_corp_strain BOOLEAN,
    obstr_tumora BOOLEAN,
    obstr_stenoza BOOLEAN,
    boli_tesut_conjunctiv BOOLEAN,
    tc_poliartrita BOOLEAN,
    tc_lupus BOOLEAN,
    tc_sjogren BOOLEAN,
    tc_vasculite BOOLEAN,
    tc_sclerodermie BOOLEAN,
    tc_boli_intestinale BOOLEAN,
    tc_altele BOOLEAN,
    defecte_congenitale BOOLEAN,
    cong_alfa1 BOOLEAN,
    cong_diskinezie BOOLEAN,
    cong_altele BOOLEAN,
    post_inhalare_toxice BOOLEAN,
    alte_categorii BOOLEAN,
    alte_tractiune BOOLEAN,
    alte_post_transplant BOOLEAN,
    alte_altele BOOLEAN,
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

INSERT INTO Etiologie (cnp, etiologie_diagnosticata, postinfectioasa, inf_bacteriana, an_diagnostic_etiologic)
VALUES ('1980501123456', TRUE, TRUE, TRUE, 2020);
INSERT INTO Etiologie (cnp, etiologie_diagnosticata)
VALUES ('2950602123456', FALSE);
-- INSERT INTO Etiologie (cnp, etiologie_diagnosticata, obstructiva)
-- VALUES ('1980703123456', FALSE, TRUE);
-- INSERT INTO Etiologie (cnp, etiologie_diagnosticata, inf_bacteriana)
-- VALUES ('1980703123456', TRUE, TRUE);
-- INSERT INTO Etiologie (cnp, etiologie_diagnosticata, an_diagnostic_etiologic)
-- VALUES ('2950602123456', TRUE, 1850);