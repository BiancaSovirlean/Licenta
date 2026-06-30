// pages/fisa/FormularSemneSimptome.jsx - formular pentru Semne si simptome la prezentare.
// Primeste cnp ca prop si trimite datele cu POST.
// Campurile conditionale ("daca...") apar doar cand parintele are valoarea ceruta.

import { useState } from "react";

// optiuni pentru scalele numerice
const MMRC = [0, 1, 2, 3, 4];
const BORG = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// valorile de pornire (simptomele = checkbox -> false; selecturile = "")
// stetacustic_normal e dropdown da/nu, deci porneste "" (neraspuns)
const formGol = {
  status_simptomatologie: "",
  tuse: false,
  tuse_tip: "",
  tuse_murray: "",
  tuse_cantitate: "",
  dispnee: false,
  dispnee_mmrc: "",
  fatigabilitate: false,
  fatigabilitate_borg: "",
  hemoptizie: false,
  hemoptizie_grad: "",
  scadere_ponderala: false,
  febra: false,
  wheezing: false,
  cianoza: false,
  degete_hipocratice: false,
  stetacustic_normal: "",
  stetacustic_tip: "",
};

function FormularSemneSimptome({ cnp, onSalvat}) {
  const [form, setForm] = useState(formGol);
  const [mesaj, setMesaj] = useState(null);

  // checkbox -> e.target.checked (true/false); restul -> e.target.value
  function schimba(e) {
    const valoare =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: valoare });
  }

  // pregateste datele respectand regulile din baza, apoi le trimite (POST)
  async function trimite(e) {
    e.preventDefault();

    const date = { ...form, cnp };

    // daca pacientul e asimptomatic, niciun simptom nu poate fi prezent
    if (date.status_simptomatologie !== "simptomatic") {
      date.tuse = false;
      date.tuse_tip = "";
      date.tuse_murray = "";
      date.tuse_cantitate = "";
      date.dispnee = false;
      date.dispnee_mmrc = "";
      date.fatigabilitate = false;
      date.fatigabilitate_borg = "";
      date.hemoptizie = false;
      date.hemoptizie_grad = "";
      date.scadere_ponderala = false;
      date.febra = false;
      date.wheezing = false;
      date.cianoza = false;
      date.degete_hipocratice = false;
    }

    // curatam sub-campurile in functie de parintele lor
    if (!date.tuse) date.tuse_tip = "";
    if (date.tuse_tip !== "productiva") {
      date.tuse_murray = "";
      date.tuse_cantitate = "";
    }
    if (!date.dispnee) date.dispnee_mmrc = "";
    if (!date.fatigabilitate) date.fatigabilitate_borg = "";
    if (!date.hemoptizie) date.hemoptizie_grad = "";

    // stetacustic: tipul de raluri apare doar daca NU e normal
    if (date.stetacustic_normal !== "nu") date.stetacustic_tip = "";
    // convertim da/nu/"" in true/false/null
    if (date.stetacustic_normal === "da") date.stetacustic_normal = true;
    else if (date.stetacustic_normal === "nu") date.stetacustic_normal = false;
    else date.stetacustic_normal = null;

    // campurile text goale devin null (checkbox-urile raman true/false)
    for (const cheie in date) {
      if (date[cheie] === "") date[cheie] = null;
    }

    const raspuns = await fetch("/semne-simptome", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(date),
    });

    if (raspuns.ok) {
      setMesaj({ text: "Semne si simptome salvate cu succes.", ok: true });
      setForm(formGol);
      if (onSalvat) onSalvat();
    } else {
      const eroare = await raspuns.json();
      setMesaj({ text: "Eroare: " + eroare.eroare, ok: false });
    }
  }

  const simptomatic = form.status_simptomatologie === "simptomatic";

  return (
    <div>
      <form onSubmit={trimite}>
        <div className="card">
          <div className="card-titlu">Adauga semne si simptome</div>

          <label>
            Status simptomatologie
            <select
              name="status_simptomatologie"
              value={form.status_simptomatologie}
              onChange={schimba}
            >
              <option value="">- alege -</option>
              <option value="asimptomatic">asimptomatic</option>
              <option value="simptomatic">simptomatic</option>
            </select>
          </label>

          {/* simptomele apar doar daca pacientul e simptomatic */}
          {simptomatic && (
            <>
              <div className="card-titlu sectiune">Simptome</div>
              <div className="lista-simpla">
                {/* tuse */}
                <label>
                  <input type="checkbox" name="tuse" checked={form.tuse} onChange={schimba} />
                  Tuse
                </label>
                {form.tuse && (
                  <label>
                    Tip tuse
                    <select name="tuse_tip" value={form.tuse_tip} onChange={schimba}>
                      <option value="">- alege -</option>
                      <option value="uscata">uscata</option>
                      <option value="productiva">productiva</option>
                    </select>
                  </label>
                )}
                {form.tuse && form.tuse_tip === "productiva" && (
                  <>
                    <label>
                      Murray sputum chart
                      <select name="tuse_murray" value={form.tuse_murray} onChange={schimba}>
                        <option value="">- alege -</option>
                        <option value="mucoid">mucoid</option>
                        <option value="mucopurulent">mucopurulent</option>
                        <option value="purulent">purulent</option>
                      </select>
                    </label>
                    <label>
                      Cantitate sputa
                      <select name="tuse_cantitate" value={form.tuse_cantitate} onChange={schimba}>
                        <option value="">- alege -</option>
                        <option value="0-30 ml">0-30 ml</option>
                        <option value="30-150 ml">30-150 ml</option>
                        <option value=">150 ml">&gt;150 ml</option>
                      </select>
                    </label>
                  </>
                )}

                {/* dispnee */}
                <label>
                  <input type="checkbox" name="dispnee" checked={form.dispnee} onChange={schimba} />
                  Dispnee
                </label>
                {form.dispnee && (
                  <label>
                    Scala mMRC
                    <select name="dispnee_mmrc" value={form.dispnee_mmrc} onChange={schimba}>
                      <option value="">- alege -</option>
                      {MMRC.map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </label>
                )}

                {/* fatigabilitate */}
                <label>
                  <input type="checkbox" name="fatigabilitate" checked={form.fatigabilitate} onChange={schimba} />
                  Fatigabilitate
                </label>
                {form.fatigabilitate && (
                  <label>
                    Scala Borg modificata
                    <select name="fatigabilitate_borg" value={form.fatigabilitate_borg} onChange={schimba}>
                      <option value="">- alege -</option>
                      {BORG.map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </label>
                )}

                {/* hemoptizie */}
                <label>
                  <input type="checkbox" name="hemoptizie" checked={form.hemoptizie} onChange={schimba} />
                  Hemoptizie
                </label>
                {form.hemoptizie && (
                  <label>
                    Grad hemoptizie
                    <select name="hemoptizie_grad" value={form.hemoptizie_grad} onChange={schimba}>
                      <option value="">- alege -</option>
                      <option value="striuri">striuri</option>
                      <option value="mica">mica (&lt;20ml/24h)</option>
                      <option value="medie">medie (20-200ml/24h)</option>
                      <option value="masiva">masiva (&gt;200ml/24h)</option>
                    </select>
                  </label>
                )}

                {/* simptome simple (fara sub-campuri) */}
                <label>
                  <input type="checkbox" name="scadere_ponderala" checked={form.scadere_ponderala} onChange={schimba} />
                  Scadere ponderala
                </label>
                <label>
                  <input type="checkbox" name="febra" checked={form.febra} onChange={schimba} />
                  Febra
                </label>
                <label>
                  <input type="checkbox" name="wheezing" checked={form.wheezing} onChange={schimba} />
                  Wheezing
                </label>
                <label>
                  <input type="checkbox" name="cianoza" checked={form.cianoza} onChange={schimba} />
                  Cianoza
                </label>
                <label>
                  <input type="checkbox" name="degete_hipocratice" checked={form.degete_hipocratice} onChange={schimba} />
                  Degete hipocratice
                </label>
              </div>
            </>
          )}

          {/* examen obiectiv local - mereu vizibil */}
          <div className="card-titlu sectiune">Examen obiectiv local</div>
          <label>
            Stetacustic pulmonar normal
            <select
              name="stetacustic_normal"
              value={form.stetacustic_normal}
              onChange={schimba}
            >
              <option value="">- alege -</option>
              <option value="da">da</option>
              <option value="nu">nu</option>
            </select>
          </label>
          {form.stetacustic_normal === "nu" && (
            <label>
              Tip raluri
              <select name="stetacustic_tip" value={form.stetacustic_tip} onChange={schimba}>
                <option value="">- alege -</option>
                <option value="raluri bronsice">raluri bronsice</option>
                <option value="raluri alveolare">raluri alveolare</option>
              </select>
            </label>
          )}
        </div>

        <div className="actiuni">
          <button type="submit">Salveaza semne si simptome</button>
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

export default FormularSemneSimptome;
