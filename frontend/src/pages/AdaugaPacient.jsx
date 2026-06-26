// pages/AdaugaPacient.jsx - pagina cu formularul de adaugare pacient (date demografice).
// Logica de salvare e neschimbata; doar am organizat campurile pe carduri-rubrici.

import { useState } from "react";

// valorile de pornire ale formularului (le folosim si la golire dupa salvare)
const formGol = {
  nume: "",
  prenume: "",
  cnp: "",
  data_diagnosticului: "",
  status_vital: "in viata",
  data_decesului: "",
  cauza_decesului: "",
  inaltime: "",
  greutate: "",
  status_fumator: "",
  pachete_an_interval: "",
  expuneri_noxe_pulberi: "false",
  noxe_pulberi_detaliat: "",
  expuneri_noxe_gaze_fumuri: "false",
  expuneri_noxe_vapori_solventi: "false",
};

function AdaugaPacient() {
  // useState = cum tine React minte o valoare care se poate schimba.
  const [form, setForm] = useState(formGol);
  const [mesaj, setMesaj] = useState(null);

  // se apeleaza cand scrii / alegi ceva intr-un camp
  function schimba(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // pregateste datele conform regulilor din baza, apoi le trimite (POST)
  async function trimite(e) {
    e.preventDefault();

    const date = { ...form };

    // campurile goale devin null
    for (const cheie in date) {
      if (date[cheie] === "") date[cheie] = null;
    }

    // transformam "true"/"false" (text) in valori boolean reale
    const campuriBoolean = [
      "expuneri_noxe_pulberi",
      "expuneri_noxe_gaze_fumuri",
      "expuneri_noxe_vapori_solventi",
    ];
    campuriBoolean.forEach((c) => {
      if (date[c] === "true") date[c] = true;
      else if (date[c] === "false") date[c] = false;
    });

    // REGULA deces: daca e in viata, data si cauza decesului sunt null
    if (date.status_vital === "in viata") {
      date.data_decesului = null;
      date.cauza_decesului = null;
    }

    // REGULA fumat: daca e nefumator (sau neales), pachete-an trebuie null
    if (date.status_fumator === "nefumator" || date.status_fumator === null) {
      date.pachete_an_interval = null;
    }

    // REGULA expuneri pulberi: daca nu exista expunere, detaliul e null
    if (date.expuneri_noxe_pulberi !== true) {
      date.noxe_pulberi_detaliat = null;
    }

    const raspuns = await fetch("/pacienti", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(date),
    });

    if (raspuns.ok) {
      setMesaj({ text: "Pacient salvat cu succes.", ok: true });
      setForm(formGol); // golim formularul
    } else {
      const eroare = await raspuns.json();
      setMesaj({ text: "Eroare: " + eroare.eroare, ok: false });
    }
  }

  // este pacientul fumator sau ex-fumator? (atunci cerem pachete-an)
  const esteFumator =
    form.status_fumator === "fumator_activ" ||
    form.status_fumator === "ex_fumator";

  return (
    <div>
      <h2>Adauga pacient</h2>

      <form onSubmit={trimite}>
        {/* ---------- RUBRICA: Date demografice ---------- */}
        <div className="card">
          <div className="card-titlu">Date demografice</div>
          <div className="grid-2">
            <label>
              Nume
              <input name="nume" value={form.nume} onChange={schimba} required />
            </label>
            <label>
              Prenume
              <input
                name="prenume"
                value={form.prenume}
                onChange={schimba}
                required
              />
            </label>
            <label>
              CNP
              <input
                name="cnp"
                value={form.cnp}
                onChange={schimba}
                maxLength="13"
                required
              />
            </label>
            <label>
              Anul diagnosticului
              <input
                type="number"
                name="data_diagnosticului"
                value={form.data_diagnosticului}
                onChange={schimba}
                min="1900"
              />
            </label>
            <label>
              Inaltime (cm)
              <input
                type="number"
                name="inaltime"
                value={form.inaltime}
                onChange={schimba}
              />
            </label>
            <label>
              Greutate (kg)
              <input
                type="number"
                name="greutate"
                value={form.greutate}
                onChange={schimba}
              />
            </label>
          </div>
        </div>

        {/* ---------- RUBRICA: Status vital & fumat ---------- */}
        <div className="card">
          <div className="card-titlu">Status vital & fumat</div>
          <div className="grid-2">
            <label>
              Status vital
              <select
                name="status_vital"
                value={form.status_vital}
                onChange={schimba}
              >
                <option value="in viata">in viata</option>
                <option value="decedat">decedat</option>
              </select>
            </label>

            {/* campurile de deces apar doar daca pacientul e decedat */}
            {form.status_vital === "decedat" && (
              <>
                <label>
                  Data decesului
                  <input
                    type="date"
                    name="data_decesului"
                    value={form.data_decesului}
                    onChange={schimba}
                    required
                  />
                </label>
                <label>
                  Cauza decesului
                  <select
                    name="cauza_decesului"
                    value={form.cauza_decesului}
                    onChange={schimba}
                    required
                  >
                    <option value="">- alege -</option>
                    <option value="respiratorie">respiratorie</option>
                    <option value="non respiratorie">non respiratorie</option>
                    <option value="nu se cunoaste">nu se cunoaste</option>
                  </select>
                </label>
              </>
            )}

            <label>
              Status fumator
              <select
                name="status_fumator"
                value={form.status_fumator}
                onChange={schimba}
                required
              >
                <option value="">- alege -</option>
                <option value="nefumator">nefumator</option>
                <option value="fumator_activ">fumator activ</option>
                <option value="ex_fumator">ex fumator</option>
              </select>
            </label>

            {/* pachete-an apar doar daca pacientul fumeaza sau a fumat */}
            {esteFumator && (
              <label>
                Pachete-an (interval)
                <select
                  name="pachete_an_interval"
                  value={form.pachete_an_interval}
                  onChange={schimba}
                  required
                >
                  <option value="">- alege -</option>
                  <option value="0-19">0-19</option>
                  <option value="20-40">20-40</option>
                  <option value=">40">&gt;40</option>
                </select>
              </label>
            )}
          </div>
        </div>

        {/* ---------- RUBRICA: Expuneri la noxe ---------- */}
        <div className="card">
          <div className="card-titlu">Expuneri la noxe</div>
          <div className="grid-2">
            <label>
              Expunere la pulberi
              <select
                name="expuneri_noxe_pulberi"
                value={form.expuneri_noxe_pulberi}
                onChange={schimba}
              >
                <option value="false">Nu</option>
                <option value="true">Da</option>
              </select>
            </label>

            {/* detaliul pulberilor apare doar daca exista expunere */}
            {form.expuneri_noxe_pulberi === "true" && (
              <label>
                Tip pulberi
                <select
                  name="noxe_pulberi_detaliat"
                  value={form.noxe_pulberi_detaliat}
                  onChange={schimba}
                  required
                >
                  <option value="">- alege -</option>
                  <option value="organice">organice</option>
                  <option value="anorganice">anorganice</option>
                </select>
              </label>
            )}

            <label>
              Expunere la gaze / fumuri
              <select
                name="expuneri_noxe_gaze_fumuri"
                value={form.expuneri_noxe_gaze_fumuri}
                onChange={schimba}
              >
                <option value="false">Nu</option>
                <option value="true">Da</option>
              </select>
            </label>

            <label>
              Expunere la vapori / solventi
              <select
                name="expuneri_noxe_vapori_solventi"
                value={form.expuneri_noxe_vapori_solventi}
                onChange={schimba}
              >
                <option value="false">Nu</option>
                <option value="true">Da</option>
              </select>
            </label>
          </div>
        </div>

        <div className="actiuni">
          <button type="submit">Salveaza pacient</button>
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

export default AdaugaPacient;
