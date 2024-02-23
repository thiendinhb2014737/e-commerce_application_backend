const express = require("express");
const cors = require("cors");

const app = express()
app.use(cors())

const PORT = 3002

app.get('/auth/hello', (_req, res) => {
    res.send('<h1>Chaoooo</h1>')
})


app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
        return
    }
    console.log(`Server starting seccess at http://localhost:${PORT}`)
})