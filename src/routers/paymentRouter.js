const Router = require('express');
const paymentRouter = Router();
const dotenv = require('dotenv');
dotenv.config()


paymentRouter.get('/config', (req, res) => {
    return res.status(200).json({
        status: 'OK',
        data: process.env.CLIENT_ID
    })
})


module.exports = paymentRouter;