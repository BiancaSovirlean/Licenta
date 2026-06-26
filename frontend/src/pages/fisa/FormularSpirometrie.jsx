// pages/fisa/FormularSpirometrie.jsx - formular de introducere spirometrie.
// Primeste cnp ca prop (suntem deja in fisa unui pacient) si trimite datele cu POST.

import { useState } from "react";

// valorile de pornire ale formularului (le folosim si la golire dupa salvare)
const formGol = {
  data_spirometriei: "",
  fvc_l: "",
  fvc_proc: "",
  fev1_l: "",
  fev1_proc: "",
  fev1_fvc: "",
  interpretare: "",
  severitate: "",
};

function FormularSpirometrie({ cnp }) {
  const [form, setForm] = useState(formGol);
  const [mesaj, setMesaj] = useState(null);

  // se apeleaza cand scrii / alegi ceva intr-un camp
  function schimba(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // exista o disfunctie? (atunci cerem severitatea)
  // regula din baza: severitatea se completeaza doar daca interpretarea e o disfunctie
  const areDisfunctie =
    form.interpretare !== "" &&
    form.interpretare !== "functie pulmonara normala";

  // pregateste datele conform regulilor din baza, apoi le trimite (POST)
  async function trimite(e) {
    e.preventDefault();

    // adaugam cnp-ul (vine din prop, nu din formular)
    const date = { ...form, cnp };

    // campurile goale devin null
    for (const cheie in date) {
      if (date[cheie] === "") date[cheie] = null;
    }

    // input type="month" da "aaaa-ll"; completam ziua ca sa fie o DATE valida in Postgres
    if (date.data_spirometriei) {
      date.data_spirometriei = date.data_spirometriei + "-01";
    }

    // REGULA severitate: daca nu e disfunctie, severitatea trebuie sa fie null
    if (!areDisfunctie) {
      date.severitate = null;
    }

    const raspuns = await fetch("/spirometrie", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(date),
    });

    if (raspuns.ok) {
      setMesaj({ text: "Spirometrie salvata cu succes.", ok: true });
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
          <div className="card-titlu">Adauga spirometrie</div>
          <div className="grid-2">
            <label>
              Data spirometriei
              <input
                type="month"
                name="data_spirometriei"
                value={form.data_spirometriei}
                onChange={schimba}
              />
            </label>

            <label>
              FVC (litri)
              <input
                type="number"
                step="0.01"
                name="fvc_l"
                value={form.fvc_l}
                onChange={schimba}
              />
            </label>

            <label>
              FVC (%)
              <input
                type="number"
                step="0.01"
                name="fvc_proc"
                value={form.fvc_proc}
                onChange={schimba}
              />
            </label>

            <label>
              FEV1 (litri)
              <input
                type="number"
                step="0.01"
                name="fev1_l"
                value={form.fev1_l}
                onChange={schimba}
              />
            </label>

            <label>
              FEV1 (%)
              <input
                type="number"
                step="0.01"
                name="fev1_proc"
                value={form.fev1_proc}
                onChange={schimba}
              />
            </label>

            <label>
              FEV1 / FVC
              <input
                type="number"
                step="0.01"
                name="fev1_fvc"
                value={form.fev1_fvc}
                onChange={schimba}
              />
            </label>

            <label>
              Interpretare
              <select
                name="interpretare"
                value={form.interpretare}
                onChange={schimba}
              >
                <option value="">- alege -</option>
                <option value="functie pulmonara normala">
                  functie pulmonara normala
                </option>
                <option value="disfunctie ventilatorie mixta">
                  disfunctie ventilatorie mixta
                </option>
                <option value="disfunctie ventilatorie obstructiva">
                  disfunctie ventilatorie obstructiva
                </option>
                <option value="disfunctie ventilatorie restrictiva">
                  disfunctie ventilatorie restrictiva
                </option>
              </select>
            </label>

            {/* severitatea apare doar daca exista o disfunctie */}
            {areDisfunctie && (
              <label>
                Severitate
                <select
                  name="severitate"
                  value={form.severitate}
                  onChange={schimba}
                  required
                >
                  <option value="">- alege -</option>
                  <option value="usoara">usoara</option>
                  <option value="moderata">moderata</option>
                  <option value="moderat-severa">moderat-severa</option>
                  <option value="severa">severa</option>
                </select>
              </label>
            )}
          </div>
        </div>

        <div className="actiuni">
          <button type="submit">Salveaza spirometrie</button>
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

export default FormularSpirometrie;
