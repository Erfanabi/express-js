const express = require('express')
const { allRouters } = require("./routers");
const app = express()
const port = 3000


app.use(allRouters);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
