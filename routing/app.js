const express = require('express')
const app = express()
const port = 3000


app.get('/', (req, res) => {
  res.send('hello world')
  res.send('<h1>Hello World!</h1>')
  res.send({ message: 'hello world' })
})

app.get('/users', (req, res) => {
  res.status(200).json({ users: [{ id: 1, name: "John" }, { id: 2, name: "Doe" }] })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
