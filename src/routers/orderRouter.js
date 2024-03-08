const Router = require('express');
const {
    createOrder,
    getAllOrderDetails,
    getDetailsOrder,
    cancelOrderDetails
} = require('../controllers/orderController');

const orderRouter = Router();

orderRouter.post('/create', createOrder)
orderRouter.get('/get-all-order/:id', getAllOrderDetails)
orderRouter.get('/get-details-order/:id', getDetailsOrder)
orderRouter.delete('/cancel-order/:id', cancelOrderDetails)


module.exports = orderRouter;