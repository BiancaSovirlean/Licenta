CREATE TABLE Pacienti (
	pacient_id SERIAL PRIMARY KEY,
	nume VARCHAR(100),
	prenume VARCHAR(100),
	cnp VARCHAR(20) UNIQUE,
    data_diagnosticului INT CHECK (data_diagnosticului >= 1900),
	status_vital VARCHAR(20) CHECK (status_vital IN ('in viata', 'decedat')),
	data_decesului DATE,
	cauza_decesului VARCHAR(50) CHECK (cauza_decesului IN ('respiratorie', 'non respiratorie', 'nu se cunoaste')),
	sex CHAR(1) GENERATED ALWAYS AS (
		CASE
			WHEN SUBSTRING(cnp FROM 1 FOR 1) IN ('1', '3', '5', '7') THEN 'M'
			WHEN SUBSTRING(cnp FROM 1 FOR 1) IN ('2', '4', '6', '8') THEN 'F'
			ELSE 'N'
		END
	) STORED,
	date_of_birth DATE GENERATED ALWAYS AS (
		TO_DATE(
			CASE SUBSTRING(cnp FROM 1 FOR 1)
				WHEN '1' THEN '19'
				WHEN '2' THEN '19'
				WHEN '5' THEN '20'
				WHEN '6' THEN '20'
				WHEN '3' THEN '18'
				WHEN '4' THEN '18'
				ELSE '19'
			END || SUBSTRING(cnp FROM 2 FOR 6),
			'YYYYMMDD'
		)
	) STORED,
	inaltime NUMERIC(5),
	greutate NUMERIC(5),
	imc NUMERIC(5,2) GENERATED ALWAYS AS (greutate / (inaltime/100.0 * inaltime/100.0)) STORED,
	categorie_imc VARCHAR(20) GENERATED ALWAYS AS (
		CASE
			WHEN imc < 18.5 THEN 'subponderal'
			WHEN imc >= 18.5 AND imc < 25 THEN 'normal'
			WHEN imc >= 25 AND imc < 30 THEN 'supraponderal'
			WHEN imc >= 30 AND imc < 35 THEN 'obezitate grad 1'
			WHEN imc >= 35 AND imc < 40 THEN 'obezitate grad 2'
			ELSE 'obezitate grad 3'
		END
	) STORED,
	status_fumator VARCHAR(20) CHECK (status_fumator IN ('nefumator', 'fumator_activ', 'ex_fumator')),
	pachete_an_interval VARCHAR(10) CHECK (pachete_an_interval IN ('0-19', '20-40', '>40')),
	data_inregistrare DATE,
	expuneri_noxe_pulberi BOOLEAN,
	noxe_pulberi_detaliat VARCHAR(255) CHECK (noxe_pulberi_detaliat IN ('organice', 'anorganice')),
	expuneri_noxe_gaze_fumuri BOOLEAN,
	expuneri_noxe_vapori_solventi BOOLEAN,

	CONSTRAINT check_logica_deces CHECK (
		(status_vital = 'in viata' AND data_decesului IS NULL AND cauza_decesului IS NULL)
		OR
		(status_vital = 'decedat' AND data_decesului IS NOT NULL AND cauza_decesului IS NOT NULL)
	),

	CONSTRAINT check_logica_fumat CHECK (
		(status_fumator = 'nefumator' AND pachete_an_interval IS NULL)
		OR
		(status_fumator IN('fumator_activ','ex_fumator') AND pachete_an_interval IS NOT NULL)
	),

	CONSTRAINT check_logica_expuneri CHECK (
		(expuneri_noxe_pulberi = TRUE AND (noxe_pulberi_detaliat IS NOT NULL))
		OR
		(expuneri_noxe_pulberi = FALSE AND noxe_pulberi_detaliat IS NULL)
	)
);

-- VIEW pentru categoria de vârsta (se calculează dinamic)
CREATE VIEW v_pacienti_cu_categorie AS
SELECT
	*,
	CASE
		WHEN date_of_birth < CURRENT_DATE - INTERVAL '65 years' THEN '>65 ani'
		WHEN date_of_birth > CURRENT_DATE - INTERVAL '45 years' THEN '<45 ani'
		ELSE '45-65 ani'
	END AS categorie_varsta
FROM Pacienti;

-- INSERT statements
INSERT INTO Pacienti (
	nume, prenume, cnp, data_diagnosticului, status_vital,
	data_decesului, cauza_decesului, inaltime, greutate,
	status_fumator, pachete_an_interval, data_inregistrare,
	expuneri_noxe_pulberi, noxe_pulberi_detaliat, expuneri_noxe_gaze_fumuri, expuneri_noxe_vapori_solventi
) VALUES
('Popescu', 'Ion', '1650315123456', 2015, 'in viata',
	NULL, NULL, 178, 82,
	'nefumator', NULL, '2024-01-15',
	TRUE, 'anorganice', FALSE, FALSE
),
('Ionescu', 'Maria', '2700420234567', 2018, 'in viata',
	NULL, NULL, 165, 68,
	'fumator_activ', '20-40', '2024-02-20',
	FALSE, NULL, TRUE, FALSE
),
('Georgescu', 'Mihai', '1450812345678', 2012, 'decedat',
	'2024-05-10', 'respiratorie', 172, 75,
	'ex_fumator', '0-19', '2023-11-05',
	TRUE, 'organice', TRUE, TRUE
),
('Vasile', 'Ana', '2560628456789', 2020, 'in viata',
	NULL, NULL, 160, 62,
	'nefumator', NULL, '2024-03-10',
	FALSE, NULL, FALSE, TRUE
),
('Marinescu', 'Gheorghe', '1720504567890', 2016, 'in viata',
	NULL, NULL, 180, 88,
	'fumator_activ', '>40', '2024-04-25',
	TRUE, 'anorganice', FALSE, TRUE
);