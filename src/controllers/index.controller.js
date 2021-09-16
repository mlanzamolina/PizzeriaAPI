const { Pool } = require('pg');

const pool = new Pool ({
    host: 'b5hctfvcrt6ruttschyi-postgresql.services.clever-cloud.com',
    user: 'u79mr35fsvyg7hr5yill',
    password: 'gaCrbxaYmhkBKQYBy6nZ',
    database: 'b5hctfvcrt6ruttschyi',
    port: '5432'
})

//USUARIOS
const getUsers = async (req, res) => {
    const respone = await pool.query('select * from usuario');
    res.json(respone.rows)
}

const getUserByID = async (req, res) => {
    const id = req.params.user_id;
    const response = await pool.query('SELECT * FROM usuario Where user_id = $1', [id]);
    res.json(response.rows);
}

const createUser = async (req, res) => {
    const {nombre, clave, admin, apellido, username} = req.body;
    const resonse = await pool.query(`insert into usuario (nombre, clave, admin, apellido, username) 
        values ($1, $2, $3, $4, $5)`,
        [nombre, clave, admin, apellido, username])
    console.log(resonse);
    res.send('user created');
}


//PRODUCTOS
const getProducto = async (req, res) => {
    const respone = await pool.query('select * from producto');
    res.json(respone.rows)
}

const getProductoByID = async (req, res) => {
    const id = req.params.idproducto;
    var querty = 'SELECT * FROM producto Where idproducto = $1';
    const response = await pool.query(querty, [id]);
    res.json(response.rows);
}

const createProducto = async (req, res) => {
    const {nombre_producto, descripcion, precio, imagen, active} = req.body;
    const response = await pool.query('insert into producto (nombre_producto, descripcion, precio, imagen, active) values ($1, $2, $3, $4, $5)',
         [nombre_producto, descripcion, precio, imagen, active])
    console.log(response);
    res.send('user created');
}

const deleteProducto = async (req, res) => {
    const id = req.params.idproducto;
    const response = await pool.query('DELETE FROM producto WHERE idproducto = $1', [id]);
    console.log(response);
    res.json('User ${idproducto} deleted successfully');
}

const updateProducto = async (req, res) => {
    const idproducto = req.params.idproducto;
    const {precio, active} = req.body;
    const response = await pool.query('UPDATE producto SET precio = $1, active = $2 WHERE idproducto = $3',
    [
        precio,
        active,
        idproducto
    ]);
    console.log(response);
    res.json('producto actualizado');
}

//REVIEWS
const getReviews = async (req, res) => {
    const respone = await pool.query('select * from review');
    res.json(respone.rows)
}

const createReview = async (req, res) => {
    const { idproducto, review } = req.body;
    const response = await pool.query('insert into review (idproducto, review) values ($1, $2)',
         [idproducto, review])
    console.log(response);
    res.send('review created');
}

const getReviewsByProduct = async (req, res) => {
    const id = req.params.idproducto;
    var querty = 'SELECT * FROM review Where idproducto = $1';
    const response = await pool.query(querty, [id]);
    res.json(response.rows);
}

//Orden
const getOrdenes = async (req, res) => {
    const respone = await pool.query('select * from orden');
    res.json(respone.rows)
}

const createOrden = async (req, res) => {
    const { aprovado , user_id, orderTotal } = req.body;
    const response = await pool.query('insert into orden (aprovado , user_id, orderTotal) values ($1, $2, $3)',
         [aprovado , user_id, orderTotal])
    console.log(response);
    res.send('orden created');
}
//no funca bien
const updateOrden = async (req, res) => {
    const idproducto = req.params.idproducto;
    const {aprovado, orderTotal} = req.body;
    const response = await pool.query('UPDATE orden SET aprovado = $1, ordertotal = $2 WHERE order_id = $3',
    [
        aprovado,
        orderTotal,
        idproducto
    ]);
    console.log(response);
    res.json('producto actualizado');
}

const getOrdenByID = async (req, res) => {
    const id = req.params.idproducto;
    const response = await pool.query('SELECT * FROM orden Where order_id = $1', [id]);
    res.json(response.rows);
}

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
    getOrdenByID
}