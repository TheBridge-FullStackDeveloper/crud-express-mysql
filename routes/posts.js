const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController")
//insertamos un nuevo Post

//opcion A para crear un post
// router.post("/", (req, res) => {
//   let sql = `INSERT INTO posts (title, body) values
//           ('${req.body.title}', '${req.body.body}');`;
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send("Post added...");
//   });
// });

//opcion B para crear un post
//ruta create post que llama a la funcion del controlador
router.post("/create", PostController.createPosts);
// Para traernos los posts
router.get("/",PostController.getAllPosts );
//Traerme un post por su id
// localhost:3000/posts/id/7
router.get("/id/:id", PostController.getPostsById);
//actualizamos un post
router.put("/id/:id", PostController.updatePostById);
router.delete("/id/:id",PostController.deletePostById);

module.exports = router;
