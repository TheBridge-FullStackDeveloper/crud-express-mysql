const express = require("express"); //importo express
const app = express(); //inicializo express
const mysql = require("mysql2");
const PORT = 3000;

//middlware
app.use(express.json()); //para que el body no sea undefined

//creamos conexión
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "expressDB", //use expressDB, para conectarnos a la base de datos con la que queremos trabajar
});

// nos conectamos a la base de datos
db.connect();

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

//insertamos un nuevo Post

//opcion A para crear un post
// app.post("/", (req, res) => {
//   let sql = `INSERT INTO posts (title, body) values
//           ('${req.body.title}', '${req.body.body}');`;
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send("Post added...");
//   });
// });

//opcion B para crear un post

app.post("/", (req, res) => {
  let post = { title: req.body.title, body: req.body.body };
  let sql = "INSERT INTO posts SET ?";
  db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post added...");
  });
});

// Para traernos los posts
app.get("/", (req, res) => {
  let sql = "SELECT * FROM posts";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//Traerme un post por su id
app.get("/id/:id", (req, res) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//actualizamos un post
app.put("/id/:id", (req, res) => {
  let newTitle = req.body.title;
  let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Post updated...");
  });
});

app.delete("/id/:id", (req, res) => {
  let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Post deleted");
  });
});

//listen siempre al final
app.listen(PORT, () => console.log(`Servidor levantado en el puerto ${PORT}`));
