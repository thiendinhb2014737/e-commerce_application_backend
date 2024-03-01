const Router = require('express');
const {
    getAllType,
    getAllProduct
} = require('../controllers/productController');

const productRouter = Router();
productRouter.get('/get-all-type', getAllType)
productRouter.get('/get-all', getAllProduct)

module.exports = productRouter;