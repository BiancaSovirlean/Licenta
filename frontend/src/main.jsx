// main.jsx - punctul de pornire al aplicatiei React.
// "Lipeste" componenta principala App de div-ul #root din index.html.
// BrowserRouter este "creierul" rutarii: el urmareste adresa din bara browserului
// si lasa componentele Route (din App.jsx) sa decida ce pagina se afiseaza.

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
