// components/Navbar.jsx - meniul de navigare.
// NavLink e ca <Link>, dar stie singur ce pagina e deschisa si ii pune clasa "activ"
// (asa o evidentiem in meniu). Schimba pagina fara sa reincarce tot site-ul.

import { NavLink } from "react-router-dom";

// daca link-ul e pagina curenta, primeste si clasa "activ"
function clasa({ isActive }) {
  return isActive ? "nav-link activ" : "nav-link";
}

function Navbar() {
  return (
    <nav className="navbar">
      {/* "end" = se aprinde doar pe "/" exact, nu si pe celelalte rute */}
      <NavLink to="/" end className={clasa}>
        Dashboard
      </NavLink>
      <NavLink to="/pacienti" className={clasa}>
        Lista pacienti
      </NavLink>
      <NavLink to="/adauga" className={clasa}>
        Adauga pacient
      </NavLink>
    </nav>
  );
}

export default Navbar;
