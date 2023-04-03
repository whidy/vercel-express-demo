// https://vercel.com/guides/using-express-with-vercel#standalone-express
const app = require('express')();

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

// need vercel.json
app.get('/api/item/:slug', (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

app.get('/api/test2', (req, res) => {
  res.send('The test2 in api/index.js!')
})

module.exports = app;
