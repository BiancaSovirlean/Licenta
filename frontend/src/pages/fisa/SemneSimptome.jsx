// pages/fisa/SemneSimptome.jsx - sectiunea 3 din fisa pacientului (afisare).
// Tuse, sputa (Murray), dispnee (mMRC), fatigabilitate (Borg), hemoptizie,
// examen obiectiv. Sub-campurile apar doar daca au sens (ex. mMRC doar daca dispnee).

import { useState, useEffect } from "react";
import FormularSemneSimptome from "./FormularSemneSimptome";

function SemneSimptome({ cnp }) {
  const [date, setDate] = useState(null);

  const [gata, setGata] = useState(false); // a terminat fetch-ul?

  async function incarcaSemne() {
    const raspuns = await fetch(`/semne-simptome/${cnp}`);
    if (raspuns.ok) {
      const date = await raspuns.json();
      setDate(date);
    } else {
      setDate(null);
    }
    setGata(true);
  }

  useEffect(() => { incarcaSemne(); }, [cnp]);

  if (!gata) return <p>Se incarca...</p>;
  // nu sunt date -> aratam formularul; dupa salvare reincarcam si trecem pe afisare
  if (!date) return <FormularSemneSimptome cnp={cnp} onSalvat={incarcaSemne} />;

  // boolean -> "da"/"nu"; null/lipsa -> "-"
  function daNu(v) {
    if (v === true) return "da";
    if (v === false) return "nu";
    return "-";
  }

  const simptomatic = date.status_simptomatologie === "simptomatic";

  return (
    <div className="card">
      <div className="card-titlu">Semne si simptome</div>

      <div className="grid-2">
        <div>
          <div className="eticheta">Status simptomatologie</div>
          <div className="valoare">{date.status_simptomatologie}</div>
        </div>
      </div>

      {simptomatic && (
        <>
          <div className="card-titlu sectiune">Simptome</div>
          <div className="grid-2">
            <div>
              <div className="eticheta">Tuse</div>
              <div className="valoare">{daNu(date.tuse)}</div>
            </div>
            {date.tuse && (
              <div>
                <div className="eticheta">Tip tuse</div>
                <div className="valoare">{date.tuse_tip}</div>
              </div>
            )}
            {date.tuse && date.tuse_tip === "productiva" && (
              <>
                <div>
                  <div className="eticheta">Murray sputum chart</div>
                  <div className="valoare">{date.tuse_murray}</div>
                </div>
                <div>
                  <div className="eticheta">Cantitate sputa</div>
                  <div className="valoare">{date.tuse_cantitate}</div>
                </div>
              </>
            )}

            <div>
              <div className="eticheta">Dispnee</div>
              <div className="valoare">{daNu(date.dispnee)}</div>
            </div>
            {date.dispnee && (
              <div>
                <div className="eticheta">Scala mMRC</div>
                <div className="valoare">{date.dispnee_mmrc}</div>
              </div>
            )}

            <div>
              <div className="eticheta">Fatigabilitate</div>
              <div className="valoare">{daNu(date.fatigabilitate)}</div>
            </div>
            {date.fatigabilitate && (
              <div>
                <div className="eticheta">Scala Borg</div>
                <div className="valoare">{date.fatigabilitate_borg}</div>
              </div>
            )}

            <div>
              <div className="eticheta">Hemoptizie</div>
              <div className="valoare">{daNu(date.hemoptizie)}</div>
            </div>
            {date.hemoptizie && (
              <div>
                <div className="eticheta">Grad hemoptizie</div>
                <div className="valoare">{date.hemoptizie_grad}</div>
              </div>
            )}

            <div>
              <div className="eticheta">Scadere ponderala</div>
              <div className="valoare">{daNu(date.scadere_ponderala)}</div>
            </div>
            <div>
              <div className="eticheta">Febra</div>
              <div className="valoare">{daNu(date.febra)}</div>
            </div>
            <div>
              <div className="eticheta">Wheezing</div>
              <div className="valoare">{daNu(date.wheezing)}</div>
            </div>
            <div>
              <div className="eticheta">Cianoza</div>
              <div className="valoare">{daNu(date.cianoza)}</div>
            </div>
            <div>
              <div className="eticheta">Degete hipocratice</div>
              <div className="valoare">{daNu(date.degete_hipocratice)}</div>
            </div>
          </div>
        </>
      )}

      <div className="card-titlu sectiune">Examen obiectiv local</div>
      <div className="grid-2">
        <div>
          <div className="eticheta">Stetacustic pulmonar normal</div>
          <div className="valoare">{daNu(date.stetacustic_normal)}</div>
        </div>
        {date.stetacustic_normal === false && (
          <div>
            <div className="eticheta">Tip raluri</div>
            <div className="valoare">{date.stetacustic_tip}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SemneSimptome;
