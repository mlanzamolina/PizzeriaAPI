const { Router } =  require('express');
const router = Router();

const { getUsers, createUser, getUserByUsername, getUserByID,validateUser } = require('../controllers/index.controller');
const { getProducto, createProducto, getProductoByID, deleteProducto, updateProducto } = require('../controllers/index.controller');
const { getReviews, createReview, getReviewsByProduct } = require('../controllers/index.controller');
const { getOrdenes, createOrden, updateOrden, getOrdenByID } = require('../controllers/index.controller');
const { getDetalle_Orden, createDetalle_Orden, getDetalleByOrderID, updateDetalle, deleteDetalle } = require('../controllers/index.controller');

//USUARIOS
router.get('/usuarios', getUsers);
//router.get('/usuarios/:user_id', getUserByID);
router.get('/usuarios/:username', getUserByUsername)
router.get('/validate/:username', validateUser)
router.post('/usuarios', createUser);

//PRODUCTOS
router.get('/productos', getProducto);
router.get('/productos/:idproducto', getProductoByID);
router.post('/productos', createProducto);
router.delete('/productos/:idproducto', deleteProducto);
router.put('/productos/:idproducto', updateProducto);

//REVIEWS
router.get('/reviews', getReviews);
router.get('/reviews/:idproducto', getReviewsByProduct);
router.post('/reviews', createReview);

//ORDENES
router.get('/ordenes', getOrdenes);
router.get('/ordenes/:order_id', getOrdenByID);
router.post('/ordenes', createOrden);
router.put('/ordenes/:order_id', updateOrden);

//DETALLE_ORDEN
router.get('/detalles', getDetalle_Orden);
// router.get('/detalles/:orderdetail_id', getDetalleByID);
// router.get('/detalles/:orderdetail_id/:order_id', getDetalleByOrderID);
router.get('/detalles/:order_id', getDetalleByOrderID);
router.post('/detalles', createDetalle_Orden);
router.put('/detalles/:orderdetail_id', updateDetalle);
router.delete('/detalles/:orderdetail_id', deleteDetalle);

module.exports = router;