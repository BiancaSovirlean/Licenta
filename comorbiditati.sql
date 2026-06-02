-- ============================================================
-- COMORBIDITATI (1:1 cu pacientul)
-- ============================================================
CREATE TABLE
    Comorbiditati (
        cnp VARCHAR(20) REFERENCES Pacienti (cnp) ON DELETE CASCADE,
        UNIQUE (cnp),
        -- pulmonare 
        astm BOOLEAN DEFAULT FALSE,
        bpoc BOOLEAN DEFAULT FALSE,
        pid BOOLEAN DEFAULT FALSE,
        insuf_resp_cronica_o2 BOOLEAN DEFAULT FALSE,
        sas BOOLEAN DEFAULT FALSE,
        sas_tip VARCHAR(15) CHECK (sas_tip IN ('obstructiv', 'central', 'mixt')),
        tbc_sechelara BOOLEAN DEFAULT FALSE,
        covid19 BOOLEAN DEFAULT FALSE,
        pneumoconioze BOOLEAN DEFAULT FALSE,
        -- cardiovasculare 
        cardiovasculare BOOLEAN DEFAULT FALSE,
        cv_hta_esentiala BOOLEAN DEFAULT FALSE,
        cv_htap BOOLEAN DEFAULT FALSE,
        cv_insuf_cardiaca BOOLEAN DEFAULT FALSE,
        cv_ateroscleroza BOOLEAN DEFAULT FALSE,
        cv_aritmii BOOLEAN DEFAULT FALSE,
        cv_valvulopatii BOOLEAN DEFAULT FALSE,
        -- ORL 
        orl BOOLEAN DEFAULT FALSE,
        orl_rinosinuzita BOOLEAN DEFAULT FALSE,
        orl_polipi_nazali BOOLEAN DEFAULT FALSE,
        -- neurologice
        neurologice BOOLEAN DEFAULT FALSE,
        -- psihiatrice 
        psihiatrice BOOLEAN DEFAULT FALSE,
        psi_anxietate BOOLEAN DEFAULT FALSE,
        psi_depresie BOOLEAN DEFAULT FALSE,
        psi_altele BOOLEAN DEFAULT FALSE,
        -- metabolice / diabet 
        diabet BOOLEAN DEFAULT FALSE,
        diabet_tip VARCHAR(10) CHECK (diabet_tip IN ('tip 1', 'tip 2')),
        diabet_insulinonecesitant BOOLEAN DEFAULT FALSE,
        diabet_antidiabetice_orale BOOLEAN DEFAULT FALSE,
        -- gastrice 
        gastrice BOOLEAN DEFAULT FALSE,
        gastro_reflux BOOLEAN DEFAULT FALSE,
        gastro_boli_hepatice BOOLEAN DEFAULT FALSE,
        -- neoplazii 
        neoplazii BOOLEAN DEFAULT FALSE,
        neo_pulmonar BOOLEAN DEFAULT FALSE,
        neo_mamar BOOLEAN DEFAULT FALSE,
        neo_prostatic BOOLEAN DEFAULT FALSE,
        neo_digestiv BOOLEAN DEFAULT FALSE,
        neo_hematologic BOOLEAN DEFAULT FALSE,
        neo_cerebral BOOLEAN DEFAULT FALSE,
        neo_osos BOOLEAN DEFAULT FALSE,
        neo_piele BOOLEAN DEFAULT FALSE,
        neo_altele BOOLEAN DEFAULT FALSE,
        -- diverse 
        osteoporoza BOOLEAN DEFAULT FALSE,
        boala_cronica_rinichi BOOLEAN DEFAULT FALSE,
        -- boli autoimune (cu gate)
        boli_autoimune BOOLEAN DEFAULT FALSE,
        ai_poliartrita BOOLEAN DEFAULT FALSE,
        ai_lupus BOOLEAN DEFAULT FALSE,
        ai_sjogren BOOLEAN DEFAULT FALSE,
        ai_boli_intestinale BOOLEAN DEFAULT FALSE,
        ai_vasculite_anca BOOLEAN DEFAULT FALSE,
        ai_altele BOOLEAN DEFAULT FALSE,
        -- imunodeficiente (cu gate)
        imunodeficiente BOOLEAN DEFAULT FALSE,
        imuno_primare BOOLEAN DEFAULT FALSE,
        imuno_secundare BOOLEAN DEFAULT FALSE,
        -- altele (cu gate)
        altele BOOLEAN DEFAULT FALSE,
        alt_abpa BOOLEAN DEFAULT FALSE,
        alt_deficit_a1at BOOLEAN DEFAULT FALSE,
        alt_diskinezie_ciliara BOOLEAN DEFAULT FALSE,
        alt_infectii_copilarie BOOLEAN DEFAULT FALSE,
        alt_aspiratie_corp_strain BOOLEAN DEFAULT FALSE,
        alt_anomalii_congenitale BOOLEAN DEFAULT FALSE,
        CONSTRAINT check_sas CHECK (
            sas = TRUE
            OR sas_tip IS NULL
        ),
        CONSTRAINT check_cardiovasculare CHECK (
            cardiovasculare = TRUE
            OR NOT (
                cv_hta_esentiala
                OR cv_htap
                OR cv_insuf_cardiaca
                OR cv_ateroscleroza
                OR cv_aritmii
                OR cv_valvulopatii
            )
        ),
        CONSTRAINT check_orl CHECK (
            orl = TRUE
            OR NOT (
                orl_rinosinuzita
                OR orl_polipi_nazali
            )
        ),
        CONSTRAINT check_psihiatrice CHECK (
            psihiatrice = TRUE
            OR NOT (
                psi_anxietate
                OR psi_depresie
                OR psi_altele
            )
        ),
        CONSTRAINT check_diabet CHECK (
            diabet = TRUE
            OR (
                diabet_tip IS NULL
                AND NOT (
                    diabet_insulinonecesitant
                    OR diabet_antidiabetice_orale
                )
            )
        ),
        CONSTRAINT check_gastrice CHECK (
            gastrice = TRUE
            OR NOT (
                gastro_reflux
                OR gastro_boli_hepatice
            )
        ),
        CONSTRAINT check_neoplazii CHECK (
            neoplazii = TRUE
            OR NOT (
                neo_pulmonar
                OR neo_mamar
                OR neo_prostatic
                OR neo_digestiv
                OR neo_hematologic
                OR neo_cerebral
                OR neo_osos
                OR neo_piele
                OR neo_altele
            )
        ),
        CONSTRAINT check_boli_autoimune CHECK (
            boli_autoimune = TRUE
            OR NOT (
                ai_poliartrita
                OR ai_lupus
                OR ai_sjogren
                OR ai_boli_intestinale
                OR ai_vasculite_anca
                OR ai_altele
            )
        ),
        CONSTRAINT check_imunodeficiente CHECK (
            imunodeficiente = TRUE
            OR NOT (
                imuno_primare
                OR imuno_secundare
            )
        ),
    );

