const Router = require('express');
const {
    getAllType,
    getAllProduct,
    getDetailsProduct
} = require('../controllers/productController');

const productRouter = Router();
productRouter.get('/get-all-type', getAllType)
productRouter.get('/get-all', getAllProduct)
productRouter.get('/get-details/:id', getDetailsProduct)

module.exports = productRouter;