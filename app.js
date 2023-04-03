const express = require('express')
const app = express()
app.use(express.static('public'))

// this wont work maybe
app.get('/api/test', (req, res) => {
  res.send('The test in app.js!')
})
