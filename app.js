const express = require("express");
const app = express();
app.use(express.static("public"));
app.use(require("./api"));

// this below won't work with vercel but ok with legacy express
app.get("/api/test", (req, res) => {
  res.send("The test in app.js!");
});
const port = 3200;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
