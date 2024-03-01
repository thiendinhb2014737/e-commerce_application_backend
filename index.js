const express = require("express");
const cors = require("cors");
const authRouter = require("./src/routers/authRouter");
const connectDb = require("./src/configs/connectDb");
const errorMiddleHandle = require("./src/middlewares/errorMiddleware");
const productRouter = require("./src/routers/productRouter");

require('dotenv').config()

const app = express()

app.use(cors())

app.use(express.json())

const PORT = 3002

app.use('/auth', authRouter)
app.use('/product', productRouter)


connectDb();

app.use(errorMiddleHandle)

app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
        return
    }
    console.log(`Server starting seccess at http://localhost:${PORT}`)
})