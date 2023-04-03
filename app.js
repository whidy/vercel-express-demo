const express = require('express')
const app = express()
const port = 3200
app.use(express.static('public'))


app.get('/api/test', (req, res) => {
  res.send('The test in app.js!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
