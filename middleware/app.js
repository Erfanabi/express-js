const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded())

// تو همه ی روت ها استفاده می شه
app.use(function (req, res, next) {
  console.log("Log1")
  next()
}, function (req, res, next) {
  console.log("Log2")
  next()
}, function (req, res, next) {
  console.log("Log3")
  next()
})

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

app.get('/', (req, res) => {
  console.log("Response route")
  res.send("finish request")
})

app.get('/users', checkAuth, checkTime, (req, res) => {
  console.log(req.time)
  console.log("Response route users")
  res.send("users")
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
