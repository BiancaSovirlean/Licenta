// pages/ListaPacienti.jsx - lista tuturor pacientilor.
// Codul tabelului a fost mutat aici din App.jsx cand am adaugat rutarea.
// De aici medicul va intra (mai tarziu) in fisa unui pacient.

import { useState, useEffect } from "react";

function ListaPacienti() {
  // useState = cum tine React minte o valoare care se poate schimba.
  const [pacienti, setPacienti] = useState([]);

  // cere lista de pacienti de la server
  async function incarcaPacienti() {
    const raspuns = await fetch("/pacienti");
    const date = await raspuns.json();
    setPacienti(date);
  }

  // ruleaza o singura data, la deschiderea paginii
  useEffect(() => {
    incarcaPacienti();
  }, []);

  return (
    <div>
      <h2>Lista pacienti</h2>
      <table>
        <thead>
          <tr>
            <th>Nume</th>
            <th>Prenume</th>
            <th>CNP</th>
            <th>Sex</th>
            <th>Status</th>
            <th>Fumator</th>
            <th>IMC</th>
          </tr>
        </thead>
        <tbody>
          {pacienti.map((p) => (
            <tr key={p.cnp}>
              <td>{p.nume}</td>
              <td>{p.prenume}</td>
              <td>{p.cnp}</td>
              <td>{p.sex}</td>
              <td>{p.status_vital}</td>
              <td>{p.status_fumator}</td>
              <td>{p.imc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaPacienti;
