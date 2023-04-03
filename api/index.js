// https://vercel.com/guides/using-express-with-vercel#standalone-express
const app = require('express')();

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
