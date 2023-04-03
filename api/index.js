// https://vercel.com/guides/using-express-with-vercel#standalone-express
const app = require('express')();

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

app.get('/api/item/:slug', (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

module.exports = app;
