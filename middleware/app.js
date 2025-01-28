const express = require('express')
const app = express()
const port = 3000

const morgan = require('morgan');

const camelCaseKey = (...args) =>
  import("camelcase-keys").then(({ default: camelCaseKey }) => {
    return camelCaseKey(...args);
  });


// app.use(morgan('combined'));  // dev, tiny

app.use(express.json())
app.use(express.urlencoded())


// فقط روت هایی که بخوایم
function checkTime(req, res, next) {
  req.time = new Date()
  next()
}

function checkAuth(req, res, next) {
  const { username, password } = req.query

  if (username === "erfan" && password === "1234") {
    return next()
  }

  res.send("Authentication is failed")
}

async function camelCase(req, res, next) {
  req.body = await camelCaseKey(req.body, { deep: true })
  req.query = await camelCaseKey(req.query)
  req.params = await camelCaseKey(req.params)

  next()
}

app.use(camelCase)

app.get('/', (req, res) => {
  console.log("Response route")
  res.send("finish request")
})

app.get('/users', checkAuth, checkTime, (req, res) => {
  console.log(req.time)
  console.log("Response route users")
  res.send("users")
})

app.get('/blogs', async (req, res) => {
  console.log(req.query)
  res.send({
    body: req.body,
    query: req.query,
    params: req.params,
  })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
