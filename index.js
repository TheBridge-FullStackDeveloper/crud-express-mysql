const express = require("express"); //importo express
const app = express(); //inicializo express
const PORT = 3000;
const db = require("./config/database")

//middlware
app.use(express.json()); //para que el body no sea undefined

//rutas
//importacion de rutas y añadimos prefijo posts
app.use("/posts",require("./routes/posts"))
// app.use("/users",require("./routes/users"))

// endpoint que crea la base de datos
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE expressDB";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Database created...");
  });
});

//creamos la tabla de Posts
app.get("/createpoststable", (req, res) => {
  let sql =
    "CREATE TABLE posts(id int AUTO_INCREMENT,title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Posts table created...");
  });
});


//listen siempre al final
app.listen(PORT, () => console.log(`Servidor levantado en el puerto ${PORT}`));
