const path = require('path');
const express = require('express')
const { NotFoundError, ErrorHandler } = require("./utils/errorHandler");
const app = express()
const port = 3000

// app.use("/static",express.static('public'))
app.use(express.static('public'))

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res, next) => {
  const users = [
    { id: 1, name: "Ali" }, { id: 1, name: "Atila" }, { id: 3, name: "Erfan" }
  ]

  res.render('index', {
    link: "https://botostart.ir", section: "this is my section", users
  })
})

app.use(NotFoundError)
app.use(ErrorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// کاربرد