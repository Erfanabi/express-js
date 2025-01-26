const express = require('express')
const app = express()
const port = 3000

const users = [{ id: 1, name: "John" }, { id: 2, name: "Doe" }, { id: 3, name: "Erfan" }]
const products = [{ id: 1, name: "product1" }, { id: 2, name: "product2" }, { id: 3, name: "product3" }]


app.get('/', (req, res) => {
  res.send('hello world')
  res.send('<h1>Hello World!</h1>')
  res.send({ message: 'hello world' })
})

app.get('/users', (req, res) => {
  res.status(200).json({ users })
})

app.get('/users/:id', (req, res) => {
  const { id } = req.params
  const user = users.find(user => user.id === +id)
  if (!user) {
    res.status(404).json({ statusCode: res.statusCode, message: 'Not Found' })
  } else {
    res.status(200).json({ statusCode: res.statusCode, data: { user } })
  }
})

// optional parameter
app.get('/product/:id?', (req, res) => {
  const { id } = req.params

  let product = null

  if (id) {
    product = products.find(product => product.id === +id)
    return res.status(200).json({ statusCode: res.statusCode, data: { product } })
  }

  res.status(200).json({ statusCode: res.statusCode, data: { products } })

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// rest api
// restfull api