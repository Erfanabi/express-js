const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded())

app.post('/body', (req, res) => {
  res.send(req.body)
})

app.put('/body', (req, res) => {
  res.send(req.body)
})

app.path('/body', (req, res) => {
  res.send(req.body)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
