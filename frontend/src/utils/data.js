// utils/data.js - functii ajutatoare pentru date calendaristice.
// formateazaData transforma o data ISO (ex. "2024-01-15T00:00:00.000Z")
// intr-un format citibil zz/ll/aaaa (ex. "15/01/2024").
// Folosim getUTC* ca sa nu se mute ziua din cauza fusului orar.

export function formateazaData(valoare) {
  if (!valoare) return ""; // daca nu exista data, nu afisam nimic
  const d = new Date(valoare);
  if (isNaN(d)) return valoare; // daca nu e o data valida, lasam textul asa cum e

  const zi = String(d.getUTCDate()).padStart(2, "0");
  const luna = String(d.getUTCMonth() + 1).padStart(2, "0");
  const an = d.getUTCFullYear();
  return `${zi}/${luna}/${an}`;
}

// formateazaLunaAn - pentru date unde ziua nu conteaza (ex. spirometrie).
// transforma "2024-01-15..." in "01/2024" (luna/an).
export function formateazaLunaAn(valoare) {
  if (!valoare) return "";
  const d = new Date(valoare);
  if (isNaN(d)) return valoare;

  const luna = String(d.getUTCMonth() + 1).padStart(2, "0");
  const an = d.getUTCFullYear();
  return `${luna}/${an}`;
}
