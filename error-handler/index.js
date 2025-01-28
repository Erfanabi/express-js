const express = require('express')
const app = express()
const port = 3000

app.use((req, res, next) => {
  // res.status(404).send("Sorry can't find that!")
  res.status(404).json({
    statusCode: req.statusCode,
    error: {
      type: 'NotFound',
      message: 'not found ' + req.url + " route",
    },
  })
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
