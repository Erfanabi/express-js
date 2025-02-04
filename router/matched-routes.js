const express = require('express')
const app = express()
const port = 3000


// app.get('/file.txt', (req, res) => {
//   res.status(200).send('Accepted: ' + req.url)
// })

// app.get('/abc?d', (req, res) => {  // abcd, abd
//   res.status(200).send('Accepted: ' + req.url + " /abc?d")
// })

// app.get('/a(bc)?de', (req, res) => {  // abcde, ade
//   res.status(200).send('Accepted: ' + req.url + " /a(bc)?de")
// })

// app.get('/ab+cd', (req, res) => {  // abcd, abbbbbbbbbcd
//   res.status(200).send('Accepted: ' + req.url + " /ab+cd")
// })

app.get('/ab*cd', (req, res) => {  // abcd, abasdasdcd
  res.status(200).send('Accepted: ' + req.url + " /ab*cd")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

