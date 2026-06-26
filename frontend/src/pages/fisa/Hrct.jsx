// pages/fisa/Hrct.jsx - sectiunea 4 din fisa pacientului (Imagistica HRCT).
// Detalii pe lobi (superior, mediu, inferior) si plamani (stang, drept),
// tip de bronsiectazii (cilindrice, varicoase, chistice) si semne asociate.

import { useState, useEffect } from "react";

// lista semnelor asociate: cheia din baza + eticheta afisata
const SEMNE = [
  { cheie: "tree_in_bud", eticheta: "Tree-in-bud" },
  { cheie: "emfizem", eticheta: "Emfizem" },
  { cheie: "fibroza_interstitiala", eticheta: "Fibroza interstitiala" },
  { cheie: "noduli_pulmonari", eticheta: "Noduli pulmonari" },
  { cheie: "cavitati", eticheta: "Cavitati" },
];

function Hrct({ cnp }) {
  const [hrct, setHrct] = useState(null);

  async function incarcaHrct() {
    const raspuns = await fetch(`/hrct/${cnp}`);
    if (raspuns.ok) {
      const date = await raspuns.json();
      setHrct(date);
    }
  }

  useEffect(() => { incarcaHrct(); }, [cnp]);

  if (!hrct) return <p>Nu exista date de HRCT pentru acest pacient.</p>;

  // pentru un lob: daca are valoare e tipul de bronsiectazii, altfel lobul e neafectat
  function afiseazaLob(valoare) {
    return valoare ? valoare : "neafectat";
  }

  // semnele asociate care sunt prezente (true)
  const semnePrezente = SEMNE.filter((s) => hrct[s.cheie]);

  return (
    <div className="card">
      <div className="card-titlu">HRCT</div>

      <div className="grid-2">
        <div>
          <div className="eticheta">Data HRCT</div>
          <div className="valoare">{hrct.data_efectuarii}</div>
        </div>
        <div>
          <div className="eticheta">Numar lobi afectati</div>
          <div className="valoare">{hrct.nr_lobi_afectati}</div>
        </div>
        <div>
          <div className="eticheta">Tip predominant bronsiectazii</div>
          <div className="valoare">{hrct.tip_predominant}</div>
        </div>
      </div>

      {/* Plaman drept */}
      <div className="card-titlu sectiune">Plaman drept</div>
      <div className="grid-3">
        <div>
          <div className="eticheta">Lob superior</div>
          <div className="valoare">{afiseazaLob(hrct.drept_superior)}</div>
        </div>
        <div>
          <div className="eticheta">Lob mediu</div>
          <div className="valoare">{afiseazaLob(hrct.drept_mediu)}</div>
        </div>
        <div>
          <div className="eticheta">Lob inferior</div>
          <div className="valoare">{afiseazaLob(hrct.drept_inferior)}</div>
        </div>
      </div>

      {/* Plaman stang */}
      <div className="card-titlu sectiune">Plaman stang</div>
      <div className="grid-3">
        <div>
          <div className="eticheta">Lob superior</div>
          <div className="valoare">{afiseazaLob(hrct.stang_superior)}</div>
        </div>
        <div>
          <div className="eticheta">Lob mediu</div>
          <div className="valoare">{afiseazaLob(hrct.stang_mediu)}</div>
        </div>
        <div>
          <div className="eticheta">Lob inferior</div>
          <div className="valoare">{afiseazaLob(hrct.stang_inferior)}</div>
        </div>
      </div>

      {/* Distributie predominanta */}
      <div className="card-titlu sectiune">Distributie predominanta</div>
      <div className="grid-2">
        <div>
          <div className="eticheta">Lateralitate</div>
          <div className="valoare">{hrct.distributie_lateralitate}</div>
        </div>
        <div>
          <div className="eticheta">Zona</div>
          <div className="valoare">{hrct.distributie_zona}</div>
        </div>
      </div>

      {/* Semne asociate */}
      <div className="card-titlu sectiune">Semne asociate</div>
      {semnePrezente.length === 0 ? (
        <div className="valoare">Niciunul</div>
      ) : (
        <div className="lista-simpla">
          {semnePrezente.map((s) => (
            <div key={s.cheie} className="valoare">{s.eticheta}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Hrct;
