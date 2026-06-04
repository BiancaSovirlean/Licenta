CREATE TABLE
    SemneSimptome (
        status_simptomatologie VARCHAR(20) CHECK (
            status_simptomatologie IN ('asimptomatic', 'simptomatic')
        ) NOT NULL,
        tuse BOOLEAN DEFAULT FALSE,
        tuse_tip VARCHAR(20) CHECK (tuse_tip IN ('uscata', 'productiva')),
        tuse_murray VARCHAR(20) CHECK (
            tuse_murray IN ('mucoid', 'mucopurulent', 'purulent')
        ),
        tuse_cantitate VARCHAR(20) CHECK (
            tuse_cantitate IN ('0-30 ml', '30-150 ml', '>150 ml')
        ),
        dispnee BOOLEAN DEFAULT FALSE,
        dispnee_mmrc SMALLINT CHECK (dispnee_mmrc BETWEEN 0 AND 4),
        fatigabilitate BOOLEAN DEFAULT FALSE,
        fatigabilitate_borg SMALLINT CHECK (fatigabilitate_borg BETWEEN 0 AND 10),
        hemoptizie BOOLEAN DEFAULT FALSE,
        hemoptizie_grad VARCHAR(10) CHECK (
            hemoptizie_grad IN ('striuri', 'mica', 'medie', 'masiva')
        ),
        scadere_ponderala BOOLEAN DEFAULT FALSE,
        febra BOOLEAN DEFAULT FALSE,
        wheezing BOOLEAN DEFAULT FALSE,
        cianoza BOOLEAN DEFAULT FALSE,
        degete_hipocratice BOOLEAN DEFAULT FALSE,
        -- examen obiectiv local
        stetacustic_normal BOOLEAN,
        stetacustic_tip VARCHAR(20) CHECK (
            stetacustic_tip IN ('raluri bronsice', 'raluri alveolare')
        ),
        CONSTRAINT check_status_simptomatologie CHECK (
            status_simptomatologie = 'simptomatic'
            OR NOT (
                tuse
                OR dispnee
                OR fatigabilitate
                OR hemoptizie
                OR scadere_ponderala
                OR febra
                OR wheezing
                OR cianoza
                OR degete_hipocratice
            )
        ),
        CONSTRAINT check_tuse CHECK (
            (
                tuse = TRUE
                AND tuse_tip IS NOT NULL
            )
            OR (
                tuse = FALSE
                AND tuse_tip IS NULL
            )
        ),
        CONSTRAINT check_tuse_prod CHECK (
            (
                tuse_tip = 'productiva'
                AND tuse_murray IS NOT NULL
                AND tuse_cantitate IS NOT NULL
            )
            OR (
                tuse_tip IS DISTINCT
                FROM
                    'productiva'
                    AND tuse_murray IS NULL
                    AND tuse_cantitate IS NULL
            )
        ),
        CONSTRAINT check_stat_normal CHECK (
            stetacustic_normal = FALSE
            OR stetacustic_tip IS NULL
        )
    );

