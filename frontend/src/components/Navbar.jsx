// components/Navbar.jsx - meniul de navigare.
// <Link> e ca un link obisnuit, dar schimba pagina fara sa reincarce tot site-ul
// (asa raman datele in memorie si e mult mai rapid).

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "16px", margin: "12px 0" }}>
      <Link to="/">Dashboard</Link>
      <Link to="/pacienti">Lista pacienti</Link>
      <Link to="/adauga">Adauga pacient</Link>
    </nav>
  );
}

export default Navbar;
