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

// ----------- query string

const posts = [
  { title: "Learn JavaScript", description: "JavaScript is a versatile programming language." },
  { title: "Introduction to Express.js", description: "Learn how to build web applications with Express.js." },
  { title: "Mastering Node.js", description: "Node.js allows you to build scalable network applications." },
  { title: "Tech News Today", description: "Stay updated with the latest technology trends." },
  { title: "Healthy Living Tips", description: "Tips for maintaining a healthy lifestyle." },
  { title: "Travel Guide", description: "Explore the best travel destinations worldwide." }
];


app.get('/search', (req, res) => {
  const queryString = req.query || 'No query provided';
  res.send(`Query: ${JSON.stringify(queryString)}`);
});

app.get('/complex', (req, res) => {
  const query = req.query;
  res.json(query);
});

app.get('/blogs', (req, res) => {
  const { title, description } = req.query;

  const regexTitle = title ? new RegExp(title, `gi`) : null;
  const regexDesc = description ? new RegExp(description, `gi`) : null;

  const filter = posts.filter(post => post.title.match(regexTitle) || post.description.match(regexDesc));

  console.log({ regexTitle, filter })

  res.send({ posts: filter });
});