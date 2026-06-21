// pages/FisaPacient.jsx - fisa unui pacient: profilul "at a glance" + tab-uri spre sectiuni.
// Tab-urile incarca componentele din pages/fisa/ (DateDemografice, Etiologie, HRCT etc.).
// Schelet gol: continutul + tab-urile vin cand lucram la aceasta sectiune.

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Scoruri from "./fisa/Scoruri";

function FisaPacient() {
  const { cnp } = useParams();
  const [pacient, setPacient] = useState(null);

  async function incarcaPacient() {
    const raspuns = await fetch(`/pacienti/${cnp}`);
    const date = await raspuns.json();
    setPacient(date);
  }

  useEffect(() => {
    incarcaPacient();
  }, [cnp]);

  if (!pacient) return <p>Se incarca...</p>;
  return (
    <div>
      <h2>{pacient.nume} {pacient.prenume}</h2>
      <div className="card">
        <div className="card-titlu">Profil pacient</div>
        <div className="grid-2">
          <div>
            <div className="eticheta">CNP</div>
            <div className="valoare">{pacient.cnp}</div>
          </div>
          <div>
            <div className="eticheta">Sex</div>
            <div className="valoare">{pacient.sex}</div>
          </div>
          <div>
            <div className="eticheta">Data Nasterii</div>
            <div className="valoare">{pacient.date_of_birth}</div>
          </div>
          <div>
            <div className="eticheta">IMC</div>
            <div className="valoare">{pacient.imc}</div>
          </div>
          <div>
            <div className="eticheta">Status Vital</div>
            <div className="valoare">{pacient.status_vital}</div>
          </div>
          <div>
            <div className="eticheta">Status Fumator</div>
            <div className="valoare">{pacient.status_fumator}</div>
          </div>
          <div>
            <div className="eticheta">Anul Diagnosticului</div>
            <div className="valoare">{pacient.data_diagnosticului}</div>
          </div>
          
        </div>
      </div>
      <Scoruri cnp={cnp}/>
    </div>

  );
}

export default FisaPacient;
