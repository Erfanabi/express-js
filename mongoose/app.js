const path = require("path");
const express = require('express')
const { NotFoundError, ErrorHandler } = require("./utils/errorHandler");
const app = express()
const port = 3000


app.use(NotFoundError)
app.use(ErrorHandler)


require(path.join(__dirname, "config", "mongo.config"));

app.get("/", (req, res) => {
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})