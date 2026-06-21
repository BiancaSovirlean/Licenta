import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Configurarea Vite.
export default defineConfig({
  plugins: [react()], // activam suportul pentru React
  server: {
    // PROXY: orice cerere care incepe cu /pacienti este trimisa mai departe
    // catre backend-ul Express de pe portul 3000. Asa nu apare problema CORS,
    // fiindca din punctul de vedere al browserului totul vine de pe 5173.
    proxy: {
      "/pacienti": "http://localhost:3000",
      "/scoruri": "http://localhost:3000",
    },
  },
});
