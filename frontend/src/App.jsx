// App.jsx - scheletul aplicatiei.
// Nu mai contine formularul si lista (acelea s-au mutat in pages/).
// Acum App afiseaza Navbar-ul sus, iar dedesubt afiseaza pagina potrivita
// in functie de adresa din browser (regulile sunt definite mai jos in <Routes>).

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ListaPacienti from "./pages/ListaPacienti.jsx";
import AdaugaPacient from "./pages/AdaugaPacient.jsx";
import FisaPacient from "./pages/FisaPacient.jsx";

function App() {
  return (
    <div className="container">
      <h1>Pacienti cu bronsiectazii</h1>

      {/* meniul apare pe toate paginile */}
      <Navbar />

      {/* fiecare Route = "daca adresa e X, afiseaza componenta Y" */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pacienti" element={<ListaPacienti />} />
        <Route path="/adauga" element={<AdaugaPacient />} />
        {/* :cnp este un parametru: /pacient/123 deschide fisa pacientului cu acel CNP */}
        <Route path="/pacient/:cnp" element={<FisaPacient />} />
      </Routes>
    </div>
  );
}

export default App;
