// https://vercel.com/guides/using-express-with-vercel#standalone-express
import express from "express";
const apiRouter = express.Router();
import db from "../app/models/index.js";

apiRouter.get("/api", async (req, res) => {
  const result = await db.tutorials.find();
  console.log(result);
  res.send("Hello World!");
});

// need vercel.json
apiRouter.get("/api/item/:slug", (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

apiRouter.get("/api/test2", (req, res) => {
  res.send("The test2 in api/index.js!");
});

apiRouter.get("/users", (req, res) => {
  res.render("users", { title: "User list", message: "Hello there!" });
});

apiRouter.post("/api/share/user", (req, res) => {
  res.send("Hello World!");
});

apiRouter.post("/api/admin/user", (req, res) => {
  res.send("Hello World!");
});

export default apiRouter;
