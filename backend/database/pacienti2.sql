CREATE TABLE
	Pacienti (
		nume VARCHAR(100) NOT NULL,
		prenume VARCHAR(100) NOT NULL,
		cnp VARCHAR(20) UNIQUE NOT NULL,
		data_diagnosticului INT CHECK (data_diagnosticului >= 1900),
		status_vital VARCHAR(20) CHECK (status_vital IN ('in viata', 'decedat')),
		data_decesului DATE,
		cauza_decesului VARCHAR(50) CHECK (
			cauza_decesului IN (
				'respiratorie',
				'non respiratorie',
				'nu se cunoaste'
			)
		),
		sex CHAR(1) GENERATED ALWAYS AS (
			CASE
				WHEN SUBSTRING(
					cnp
					FROM
						1 FOR 1
				) IN ('1', '3', '5', '7') THEN 'M'
				WHEN SUBSTRING(
					cnp
					FROM
						1 FOR 1
				) IN ('2', '4', '6', '8') THEN 'F'
				ELSE 'N'
			END
		) STORED,
		date_of_birth DATE GENERATED ALWAYS AS (
			make_date( --make_date primeste 3 numere intregi si returneaza date
				(
					CASE SUBSTRING(
							cnp
							FROM
								1 FOR 1
						)
						WHEN '1' THEN 1900
						WHEN '2' THEN 1900
						WHEN '5' THEN 2000
						WHEN '6' THEN 2000
						WHEN '3' THEN 1800
						WHEN '4' THEN 1800
						ELSE 1900
					END
				) + SUBSTRING(
					cnp
					FROM
						2 FOR 2
				)::int,
				SUBSTRING(
					cnp
					FROM
						4 FOR 2
				)::int,
				SUBSTRING(
					cnp
					FROM
						6 FOR 2
				)::int
			)
		) STORED,
		inaltime NUMERIC(5),
		greutate NUMERIC(5),
		imc NUMERIC(5, 2) GENERATED ALWAYS AS (greutate / (inaltime / 100.0 * inaltime / 100.0)) STORED,
		status_fumator VARCHAR(20) CHECK (
			status_fumator IN ('nefumator', 'fumator_activ', 'ex_fumator')
		),
		pachete_an_interval VARCHAR(10) CHECK (pachete_an_interval IN ('0-19', '20-40', '>40')),
		data_inregistrare DATE DEFAULT CURRENT_DATE,
		expuneri_noxe_pulberi BOOLEAN,
		noxe_pulberi_detaliat VARCHAR(255) CHECK (
			noxe_pulberi_detaliat IN ('organice', 'anorganice')
		),
		expuneri_noxe_gaze_fumuri BOOLEAN,
		expuneri_noxe_vapori_solventi BOOLEAN CONSTRAINT check_logica_deces CHECK (
			(
				status_vital = 'in viata'
				AND data_decesului IS NULL
				AND cauza_decesului IS NULL
			)
			OR (
				status_vital = 'decedat'
				AND data_decesului IS NOT NULL
				AND cauza_decesului IS NOT NULL
			)
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
CREATE VIEW
	v_categorie_varsta AS
SELECT
	*,
	EXTRACT(YEAR FROM age(date_of_birth)) AS varsta,
	CASE
		WHEN date_of_birth < CURRENT_DATE - INTERVAL '65 years' THEN '>65 ani'
		WHEN date_of_birth > CURRENT_DATE - INTERVAL '45 years' THEN '<45 ani'
		ELSE '45-65 ani'
	END AS categorie_varsta
FROM
	Pacienti;

CREATE VIEW
	v_categorie_imc AS
SELECT
	*,
	CASE
		WHEN imc < 18.5 THEN 'subponderal'
		WHEN imc >= 18.5
		AND imc < 25 THEN 'normal'
		WHEN imc >= 25
		AND imc < 30 THEN 'supraponderal'
		WHEN imc >= 30
		AND imc < 35 THEN 'obezitate grad 1'
		WHEN imc >= 35
		AND imc < 40 THEN 'obezitate grad 2'
		ELSE 'obezitate grad 3'
	END AS categorie_imc
FROM
	Pacienti;

INSERT INTO
	Pacienti (
		nume,
		prenume,
		cnp,
		data_diagnosticului,
		status_vital,
		data_decesului,
		cauza_decesului,
		inaltime,
		greutate,
		status_fumator,
		pachete_an_interval,
		expuneri_noxe_pulberi,
		noxe_pulberi_detaliat,
		expuneri_noxe_gaze_fumuri,
		expuneri_noxe_vapori_solventi,
		data_inregistrare
	)
VALUES
	(
		'Popescu',
		'Ion',
		'1980501123456',
		2020,
		'in viata',
		NULL,
		NULL,
		180,
		75,
		'fumator_activ',
		'20-40',
		TRUE,
		'organice',
		FALSE,
		FALSE,
		CURRENT_DATE
	),
	(
		'Ionescu',
		'Maria',
		'2950602123456',
		2018,
		'decedat',
		'2022-01-15',
		'respiratorie',
		165,
		68,
		'nefumator',
		NULL,
		FALSE,
		NULL,
		FALSE,
		FALSE,
		CURRENT_DATE
	),
	(
		'Georgescu',
		'Andrei',
		'1450703123456',
		2019,
		'in viata',
		NULL,
		NULL,
		170,
		80,
		'ex_fumator',
		'0-19',
		TRUE,
		'anorganice',
		TRUE,
		TRUE,
		CURRENT_DATE
	),
	(
		'Dumitrescu',
		'Elena',
		'2710804123456',
		2021,
		'decedat',
		'2023-03-10',
		'non respiratorie',
		160,
		55,
		'nefumator',
		NULL,
		FALSE,
		NULL,
		FALSE,
		FALSE,
		CURRENT_DATE
	),
	(
		'Vasilescu',
		'Mihai',
		'1980905123456',
		2022,
		'in viata',
		NULL,
		NULL,
		175,
		85,
		'fumator_activ',
		'>40',
		TRUE,
		'organice',
		TRUE,
		FALSE,
		CURRENT_DATE
	);