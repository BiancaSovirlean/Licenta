// pages/fisa/FormularHRCT.jsx - formular de introducere HRCT.
// Primeste cnp ca prop (suntem deja in fisa unui pacient) si trimite datele cu POST.

import { useState } from "react";

// tipurile de bronsiectazii folosite la fiecare lob
const TIPURI = ["cilindrice", "varicoase", "chistice"];

// valorile de pornire ale formularului (le folosim si la golire dupa salvare)
// lobii si selecturile incep gol (""), semnele asociate incep false (checkbox)
const formGol = {
  data_efectuarii: "",
  nr_lobi_afectati: "",
  tip_predominant: "",
  drept_superior: "",
  drept_mediu: "",
  drept_inferior: "",
  stang_superior: "",
  stang_mediu: "",
  stang_inferior: "",
  distributie_lateralitate: "",
  distributie_zona: "",
  tree_in_bud: false,
  emfizem: false,
  fibroza_interstitiala: false,
  noduli_pulmonari: false,
  cavitati: false,
};

// componenta mica reutilizabila pentru un lob (3 optiuni identice)
function SelectLob({ nume, eticheta, form, schimba }) {
  return (
    <label>
      {eticheta}
      <select name={nume} value={form[nume]} onChange={schimba}>
        <option value="">- alege -</option>
        {TIPURI.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
    </label>
  );
}

function FormularHRCT({ cnp }) {
  const [form, setForm] = useState(formGol);
  const [mesaj, setMesaj] = useState(null);

  // se apeleaza cand scrii / alegi / bifezi ceva intr-un camp
  // pentru checkbox luam e.target.checked (true/false), altfel e.target.value
  function schimba(e) {
    const valoare =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: valoare });
  }

  // pregateste datele si le trimite (POST)
  async function trimite(e) {
    e.preventDefault();

    // adaugam cnp-ul (vine din prop, nu din formular)
    const date = { ...form, cnp };

    // campurile text goale devin null; checkbox-urile raman true/false
    for (const cheie in date) {
      if (date[cheie] === "") date[cheie] = null;
    }

    const raspuns = await fetch("/hrct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(date),
    });

    if (raspuns.ok) {
      setMesaj({ text: "HRCT salvat cu succes.", ok: true });
      setForm(formGol); // golim formularul
    } else {
      const eroare = await raspuns.json();
      setMesaj({ text: "Eroare: " + eroare.eroare, ok: false });
    }
  }

  return (
    <div>
      <form onSubmit={trimite}>
        <div className="card">
          <div className="card-titlu">Adauga HRCT</div>

          <div className="grid-2">
            <label>
              Data efectuarii (an)
              <input
                type="number"
                name="data_efectuarii"
                value={form.data_efectuarii}
                onChange={schimba}
                min="1900"
                max="2026"
              />
            </label>

            <label>
              Numar lobi afectati
              <select
                name="nr_lobi_afectati"
                value={form.nr_lobi_afectati}
                onChange={schimba}
              >
                <option value="">- alege -</option>
                <option value="1">1</option>
                <option value="2 sau 3">2 sau 3</option>
                <option value=">3">&gt;3</option>
              </select>
            </label>

            <label>
              Tip predominant bronsiectazii
              <select
                name="tip_predominant"
                value={form.tip_predominant}
                onChange={schimba}
              >
                <option value="">- alege -</option>
                {TIPURI.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </label>
          </div>

          {/* Plaman drept */}
          <div className="card-titlu sectiune">Plaman drept</div>
          <div className="grid-2">
            <SelectLob nume="drept_superior" eticheta="Lob superior" form={form} schimba={schimba} />
            <SelectLob nume="drept_mediu" eticheta="Lob mediu" form={form} schimba={schimba} />
            <SelectLob nume="drept_inferior" eticheta="Lob inferior" form={form} schimba={schimba} />
          </div>

          {/* Plaman stang */}
          <div className="card-titlu sectiune">Plaman stang</div>
          <div className="grid-2">
            <SelectLob nume="stang_superior" eticheta="Lob superior" form={form} schimba={schimba} />
            <SelectLob nume="stang_mediu" eticheta="Lob mediu" form={form} schimba={schimba} />
            <SelectLob nume="stang_inferior" eticheta="Lob inferior" form={form} schimba={schimba} />
          </div>

          {/* Distributie predominanta */}
          <div className="card-titlu sectiune">Distributie predominanta</div>
          <div className="grid-2">
            <label>
              Lateralitate
              <select
                name="distributie_lateralitate"
                value={form.distributie_lateralitate}
                onChange={schimba}
              >
                <option value="">- alege -</option>
                <option value="unilaterala">unilaterala</option>
                <option value="bilaterala">bilaterala</option>
              </select>
            </label>

            <label>
              Zona
              <select
                name="distributie_zona"
                value={form.distributie_zona}
                onChange={schimba}
              >
                <option value="">- alege -</option>
                <option value="superior">superior</option>
                <option value="inferior">inferior</option>
                <option value="difuz">difuz</option>
              </select>
            </label>
          </div>

          {/* Semne asociate (checkbox: da/nu) */}
          <div className="card-titlu sectiune">Semne asociate</div>
          <div className="lista-simpla">
            <label>
              <input type="checkbox" name="tree_in_bud" checked={form.tree_in_bud} onChange={schimba} />
              Tree-in-bud
            </label>
            <label>
              <input type="checkbox" name="emfizem" checked={form.emfizem} onChange={schimba} />
              Emfizem
            </label>
            <label>
              <input type="checkbox" name="fibroza_interstitiala" checked={form.fibroza_interstitiala} onChange={schimba} />
              Fibroza interstitiala
            </label>
            <label>
              <input type="checkbox" name="noduli_pulmonari" checked={form.noduli_pulmonari} onChange={schimba} />
              Noduli pulmonari
            </label>
            <label>
              <input type="checkbox" name="cavitati" checked={form.cavitati} onChange={schimba} />
              Cavitati
            </label>
          </div>
        </div>

        <div className="actiuni">
          <button type="submit">Salveaza HRCT</button>
        </div>
      </form>

      {mesaj && (
        <p className={"mesaj " + (mesaj.ok ? "mesaj-ok" : "mesaj-eroare")}>
          {mesaj.text}
        </p>
      )}
    </div>
  );
}

export default FormularHRCT;
