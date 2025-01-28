const express = require('express')
const app = express()
const port = 3000


app.get('/', (req, res) => {
  console.log(number)
  res.send('Hello World!')
})

app.use((req, res, next) => {
  // res.status(404).send("Sorry can't find that!")
  return res.status(404).json({
    statusCode: req.statusCode,
    error: {
      type: 'NotFound',
      message: 'not found ' + req.url + " route",
    },
  })
})

app.use((err, req, res, next) => {
  return res.json({
    statusCode: err.status || 500,
    error: {
      message: err.message || "Something went wrong",
    },
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
