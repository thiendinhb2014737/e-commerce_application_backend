const express = require("express");
const cors = require("cors");
const authRouter = require("./src/routers/authRouter");
const connectDb = require("./src/configs/connectDb");
const errorMiddleHandle = require("./src/middlewares/errorMiddleware");
const productRouter = require("./src/routers/productRouter");
const orderRouter = require("./src/routers/orderRouter");
const paymentRouter = require("./src/routers/paymentRouter");
const eventRouter = require("./src/routers/EventRouter");

require('dotenv').config()

const app = express()

app.use(cors())

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));


const PORT = 3002

app.use('/auth', authRouter)
app.use('/product', productRouter)
app.use('/order', orderRouter)
app.use('/event', eventRouter)
app.use('/payment', paymentRouter)


connectDb();

app.use(errorMiddleHandle)

app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
        return
    }
    console.log(`Server starting seccess at http://localhost:${PORT}`)
})