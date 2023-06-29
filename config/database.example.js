const mysql = require("mysql2");

//creamos conexión
const db = mysql.createConnection({
  host: "localhost",
  user: "tu usuario",
  password: "tu contraseña",
  database: "nombre de tu base de datos", //use expressDB, para conectarnos a la base de datos con la que queremos trabajar
});

// nos conectamos a la base de datos
db.connect();

module.exports = db;
