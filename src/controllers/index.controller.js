const { Pool } = require("pg");

const pool = new Pool({
  host: "b5hctfvcrt6ruttschyi-postgresql.services.clever-cloud.com",
  user: "u79mr35fsvyg7hr5yill",
  password: "gaCrbxaYmhkBKQYBy6nZ",
  database: "b5hctfvcrt6ruttschyi",
  port: "5432",
});

//USUARIOS
const getUsers = async (req, res) => {
  const respone = await pool.query("select * from usuario");
  res.json(respone.rows);
};

const getUserByID = async (req, res) => {
  const id = req.params.user_id;
  const response = await pool.query(
    "SELECT * FROM usuario Where user_id = $1",
    [id]
  );
  res.json(response.rows);
};
//todos los nombres que tengan active en el nombre
const getUserActive = async (req, res) => {
  const id = req.params.nombre;
  const response = await pool.query("SELECT * FROM usuario Where nombre = $1", [
    id,
  ]);
  res.json(response.rows);
};

const getUserByUsername = async (req, res) => {
  const username = req.params.username;
  const response = await pool.query(
    "SELECT * FROM usuario Where username = $1",
    [username]
  );
  res.json(response.rows);
};

const createUser = async (req, res) => {
  const { nombre, clave, admin, apellido, username } = req.body;
  const resonse = await pool.query(
    `insert into usuario (nombre, clave, admin, apellido, username) 
        values ($1, $2, $3, $4, $5)`,
    [nombre, clave, admin, apellido, username]
  );
  console.log(resonse);
  res.send("user created");
};
//update user prueba
const updateUser = async (req, res) => {
  const username = req.params.username;
  const { nombre } = req.body;
  const response = await pool.query(
    "UPDATE usuario SET nombre = $1 WHERE username = $2",
    [nombre, username]
  );
  console.log(response);
  res.json("usuario actualizado");
};

//PRODUCTOS
const getProducto = async (req, res) => {
  const respone = await pool.query("select * from producto");
  res.json(respone.rows);
};

const getProductoByID = async (req, res) => {
  const id = req.params.idproducto;
  var querty = "SELECT * FROM producto Where idproducto = $1";
  const response = await pool.query(querty, [id]);
  res.json(response.rows);
};

const createProducto = async (req, res) => {
  const { nombre_producto, descripcion, precio, imagen, active } = req.body;
  const response = await pool.query(
    "insert into producto (nombre_producto, descripcion, precio, imagen, active) values ($1, $2, $3, $4, $5)",
    [nombre_producto, descripcion, precio, imagen, active]
  );
  console.log(response);
  res.send("user created");
};

const deleteProducto = async (req, res) => {
  const id = req.params.idproducto;
  const response = await pool.query(
    "DELETE FROM producto WHERE idproducto = $1",
    [id]
  );
  console.log(response);
  res.json("User ${idproducto} deleted successfully");
};

const updateProducto = async (req, res) => {
  const idproducto = req.params.idproducto;
  const { precio, active } = req.body;
  const response = await pool.query(
    "UPDATE producto SET precio = $1, active = $2 WHERE idproducto = $3",
    [precio, active, idproducto]
  );
  console.log(response);
  res.json("producto actualizado");
};

//REVIEWS
const getReviews = async (req, res) => {
  const respone = await pool.query("select * from review");
  res.json(respone.rows);
};

const createReview = async (req, res) => {
  const { idproducto, review } = req.body;
  const response = await pool.query(
    "insert into review (idproducto, review) values ($1, $2)",
    [idproducto, review]
  );
  console.log(response);
  res.send("review created");
};

const getReviewsByProduct = async (req, res) => {
  const id = req.params.idproducto;
  var querty = "SELECT * FROM review Where idproducto = $1";
  const response = await pool.query(querty, [id]);
  res.json(response.rows);
};

//Orden
const getOrdenes = async (req, res) => {
  const respone = await pool.query("select * from orden");
  res.json(respone.rows);
};

const createOrden = async (req, res) => {
  const { aprovado, user_id, ordertotal } = req.body;
  const response = await pool.query(
    "insert into orden (aprovado , user_id, ordertotal) values ($1, $2, $3)",
    [aprovado, user_id, ordertotal]
  );
  console.log(response);
  res.send("orden created");
};

const updateOrden = async (req, res) => {
  const order_id = req.params.order_id;
  const { aprovado, ordertotal } = req.body;
  const response = await pool.query(
    "UPDATE orden SET aprovado = $1, ordertotal = $2 WHERE order_id = $3",
    [aprovado, ordertotal, order_id]
  );
  console.log(response);
  res.json("producto actualizado");
};

const getOrdenByID = async (req, res) => {
  const id = req.params.order_id;
  const response = await pool.query("SELECT * FROM orden WHERE order_id = $1", [
    id,
  ]);
  res.json(response.rows);
};

//DETALLE_ORDEN
const getDetalle_Orden = async (req, res) => {
  const response = await pool.query("SELECT * FROM detalle_orden");
  res.json(response.rows);
};

const createDetalle_Orden = async (req, res) => {
  const { idproducto, order_id, cantidad } = req.body;
  const response = await pool.query(
    "insert into detalle_orden (idproducto , order_id, cantidad) values ($1, $2, $3)",
    [idproducto, order_id, cantidad]
  );
  console.log(response);
  res.send("orden created");
};

// const getDetalleByID = async (req, res) => {
//     const id = req.params.orderdetail_id;
//     const response = await pool.query('SELECT * FROM detalle_orden WHERE orderdetail_id = $1', [id]);
//     res.json(response.rows);
// }

const getDetalleByOrderID = async (req, res) => {
  const id = req.params.order_id;
  const response = await pool.query(
    "SELECT * FROM detalle_orden WHERE order_id = $1",
    [id]
  );
  res.json(response.rows);
};

const updateDetalle = async (req, res) => {
  const orderdetail_id = req.params.orderdetail_id;
  const { cantidad } = req.body;
  const response = await pool.query(
    "UPDATE detalle_orden SET cantidad = $1 WHERE orderdetail_id = $2",
    [cantidad, orderdetail_id]
  );
  console.log(response);
  res.json("producto actualizado");
};

const deleteDetalle = async (req, res) => {
  const orderdetail_id = req.params.orderdetail_id;
  const response = await pool.query(
    "DELETE FROM detalle_orden WHERE orderdetail_id = $1",
    [orderdetail_id]
  );
  console.log(response);
  res.json("Detail ${id} deleted successfully");
};
const validateUser = async (req, res) => {
  const username = req.params.username;
  const response = await pool.query(
    "SELECT count(1) FROM usuario Where username = $1",
    [username]
  );
  console.log(response);
  res.json(response.rows[0].count !== "0" ? { exist: true } : { exist: false });
};

//carrito
const getCarritos = async (req, res) => {
  const response = await pool.query("SELECT * FROM carrrito");
  res.json(response.rows);
};

const updateCarritocantprecio = async (req, res) => {
  const idcarrito = req.params.idcarrito;
  const { precio, cantidad } = req.body;
  const response = await pool.query(
    "UPDATE carrrito SET precio = $1, cantidad = $2 WHERE idcarrito = $3",
    [precio, cantidad, idcarrito]
  );
  console.log(response);
  res.json("producto actualizado");
};

const getcarritoByID = async (req, res) => {
  const id = req.params.idcarrito;
  const response = await pool.query(
    "select * from carrrito where idcarrito = $1",
    [id]
  );
  res.json(response.rows);
};

const deleteCarritoByID = async (req, res) => {
  const  id  = req.params.idcarrito;
  const response = await pool.query(
    "DELETE FROM carrrito WHERE idcarrito = $1",
    [id]
  );
  res.json("carrito  deleted successfully: ");
};
const deleteCarritos = async (req, res) => {
  const response = await pool.query("DELETE FROM carrrito WHERE idcarrito > 0");
  res.json("carritos deleted successfully");
};

const createCarrito = async (req, res) => {
  const { nombre_producto, precio, cantidad, imagen, idproducto, user_id } =
    req.body;
  const response = await pool.query(
    "insert into carrrito (nombre_producto, precio, cantidad, imagen, idproducto, user_id) values ($1, $2, $3, $4, $5, $6)",
    [nombre_producto, precio, cantidad, imagen, idproducto, user_id]
  );
  console.log(response);
  res.send("orden created");
};

module.exports = {
  getUsers,
  createUser,
  getUserByID,
  getProducto,
  getProductoByID,
  createProducto,
  deleteProducto,
  updateProducto,
  getReviews,
  createReview,
  getReviewsByProduct,
  getOrdenes,
  createOrden,
  updateOrden,
  getOrdenByID,
  getDetalle_Orden,
  createDetalle_Orden,
  // getDetalleByID,
  getDetalleByOrderID,
  updateDetalle,
  deleteDetalle,
  getUserByUsername,
  validateUser,
  updateUser,
  getUserActive,
  getCarritos,
  updateCarritocantprecio,
  getcarritoByID,
  deleteCarritoByID,
  createCarrito,
  deleteCarritos,
};
