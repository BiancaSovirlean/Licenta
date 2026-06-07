// db.js - aici configuram conexiunea la baza de date PostgreSQL.
// Folosim un "Pool" de conexiuni din biblioteca "pg".
// Un pool tine mai multe conexiuni deschise si le refoloseste,
// ca sa nu deschidem o conexiune noua la fiecare cerere (mai rapid).

const { Pool } = require("pg");

// Citim datele de conectare din variabilele de mediu (fisierul .env).
// Asa nu scriem parola direct in cod.
const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});

// Exportam pool-ul ca sa il putem folosi in server.js si in viitoarele rute.
module.exports = pool;
