const Router = require('express');
const {
    getAllType,
    getAllProduct,
    getDetailsProduct,
    evaluate
} = require('../controllers/productController');

const productRouter = Router();
productRouter.get('/get-all-type', getAllType)
productRouter.get('/get-all', getAllProduct)
productRouter.get('/get-details/:id', getDetailsProduct)
productRouter.put('/evaluate/:id', evaluate)//test
module.exports = productRouter;