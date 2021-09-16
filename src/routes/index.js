const { Router } =  require('express');
const router = Router();

const { getUsers, createUser, getUserByID } = require('../controllers/index.controller');
const { getProducto, createProducto, getProductoByID, deleteProducto, updateProducto } = require('../controllers/index.controller');
const { getReviews, createReview, getReviewsByProduct } = require('../controllers/index.controller');
const { getOrdenes, createOrden, updateOrden, getOrdenByID } = require('../controllers/index.controller');

//USUARIOS
router.get('/usuarios', getUsers);
router.get('/usuarios/:user_id', getUserByID);
router.post('/usuarios', createUser);

//PRODUCTOS
router.get('/productos', getProducto);
router.get('/productos/:idproducto', getProductoByID)
router.post('/productos', createProducto);
router.delete('/productos/:idproducto', deleteProducto);
router.put('/productos/:idproducto', updateProducto);

//REVIEWS
router.get('/reviews', getReviews);
router.get('/reviews/:idproducto', getReviewsByProduct)
router.post('/reviews', createReview);

//ORDENES
router.get('/ordenes', getOrdenes);
router.get('/ordenes/:order_id', getOrdenByID)
router.post('/ordenes', createOrden);
router.put('/ordenes/:order_id', updateOrden)

module.exports = router;