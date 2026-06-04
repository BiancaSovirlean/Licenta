-- ============================================================
-- TRATAMENT (1:1 cu pacientul)
-- ============================================================
CREATE TABLE
    Tratament (
        cnp VARCHAR(20) REFERENCES Pacienti (cnp) ON DELETE CASCADE,
        UNIQUE (cnp),
        -- oxigenoterapie de lunga durata 
        oxigenoterapie BOOLEAN DEFAULT FALSE,
        oxigenoterapie_an SMALLINT CHECK (oxigenoterapie_an BETWEEN 1900 AND 2100),
        -- ventilatie non-invaziva 
        ventilatie_ni BOOLEAN DEFAULT FALSE,
        ventilatie_ni_an SMALLINT CHECK (ventilatie_ni_an BETWEEN 1900 AND 2100),
        -- medicatie inhalatorie 
        medicatie_inhalatorie BOOLEAN DEFAULT FALSE,
        inh_csi BOOLEAN DEFAULT FALSE,
        inh_csi_laba BOOLEAN DEFAULT FALSE,
        inh_lama BOOLEAN DEFAULT FALSE,
        inh_laba_lama BOOLEAN DEFAULT FALSE,
        inh_laba_lama_csi BOOLEAN DEFAULT FALSE,
        inh_saba_la_nevoie BOOLEAN DEFAULT FALSE,
        -- medicatie orala
        medicatie_orala BOOLEAN DEFAULT FALSE,
        oral_antileucotriene BOOLEAN DEFAULT FALSE,
        -- corticoterapie orala sistemica > 28 zile 
        cso_peste_28zile BOOLEAN DEFAULT FALSE,
        -- mucolitice / expectorante 
        mucolitice_expectorante BOOLEAN DEFAULT FALSE,
        -- aerosoloterapie
        aerosoloterapie BOOLEAN DEFAULT FALSE,
        aero_manitol BOOLEAN DEFAULT FALSE,
        aero_ser_hiperton BOOLEAN DEFAULT FALSE,
        aero_ser_fiziologic BOOLEAN DEFAULT FALSE,
        -- antibioterapie cronica 
        antibioterapie_cronica BOOLEAN DEFAULT FALSE,
        -- nebulizare
        atb_nebulizare BOOLEAN DEFAULT FALSE,
        neb_aminoglicozide BOOLEAN DEFAULT FALSE,
        neb_macrolide BOOLEAN DEFAULT FALSE,
        neb_altele BOOLEAN DEFAULT FALSE,
        -- oral
        atb_oral BOOLEAN DEFAULT FALSE,
        oral_terapie_ciclica BOOLEAN DEFAULT FALSE,
        oral_macrolide BOOLEAN DEFAULT FALSE,
        oral_altele BOOLEAN DEFAULT FALSE,
        -- vaccinare 
        vaccin_antipneumococic BOOLEAN DEFAULT FALSE,
        vaccin_antigripal BOOLEAN DEFAULT FALSE,
        vaccin_anti_sarscov2 BOOLEAN DEFAULT FALSE,
        -- fizioterapie
        fizioterapie BOOLEAN DEFAULT FALSE,
        fizio_program_reabilitare BOOLEAN DEFAULT FALSE,
        fizio_clearance_manual BOOLEAN DEFAULT FALSE,
        fizio_device_uri BOOLEAN DEFAULT FALSE,

        CONSTRAINT check_oxigenoterapie CHECK (
            oxigenoterapie = TRUE
            OR oxigenoterapie_an IS NULL
        ),
        CONSTRAINT check_ventilatie_ni CHECK (
            ventilatie_ni = TRUE
            OR ventilatie_ni_an IS NULL
        ),
        CONSTRAINT check_medicatie_inhalatorie CHECK (
            medicatie_inhalatorie = TRUE
            OR NOT (
                inh_csi
                OR inh_csi_laba
                OR inh_lama
                OR inh_laba_lama
                OR inh_laba_lama_csi
                OR inh_saba_la_nevoie
            )
        ),
        CONSTRAINT check_medicatie_orala CHECK (
            medicatie_orala = TRUE
            OR NOT (oral_antileucotriene)
        ),
        CONSTRAINT check_aerosoloterapie CHECK (
            aerosoloterapie = TRUE
            OR NOT (
                aero_manitol
                OR aero_ser_hiperton
                OR aero_ser_fiziologic
            )
        ),
        -- antibioterapie cronica: sub-grupurile nebulizare/oral doar daca e activa
        CONSTRAINT check_antibioterapie_cronica CHECK (
            antibioterapie_cronica = TRUE
            OR NOT (
                atb_nebulizare
                OR atb_oral
            )
        ),
        -- detaliile de nebulizare doar daca nebulizare = TRUE
        CONSTRAINT check_atb_nebulizare CHECK (
            atb_nebulizare = TRUE
            OR NOT (
                neb_aminoglicozide
                OR neb_macrolide
                OR neb_altele
            )
        ),
        -- detaliile orale doar daca oral = TRUE
        CONSTRAINT check_atb_oral CHECK (
            atb_oral = TRUE
            OR NOT (
                oral_terapie_ciclica
                OR oral_macrolide
                OR oral_altele
            )
        ),
        CONSTRAINT check_fizioterapie CHECK (
            fizioterapie = TRUE
            OR NOT (
                fizio_program_reabilitare
                OR fizio_clearance_manual
                OR fizio_device_uri
            )
        )
    );

