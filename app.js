import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./app/models/index.js";
import apiRouter from "./api/index.js";
const isTest = process.env.VITEST;
const corsOptions = {
  origin: "http://localhost:8081",
};
export async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === "production",
  hmrPort
) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const resolve = (p) => path.resolve(__dirname, p);

  const indexProd = isProd
    ? fs.readFileSync(resolve("dist/client/index.html"), "utf-8")
    : "";

  const manifest = isProd
    ? JSON.parse(
        fs.readFileSync(resolve("dist/client/ssr-manifest.json"), "utf-8")
      )
    : {};

  const app = express();

  app.use(cors(corsOptions));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static("public"));

  db.mongoose
    .connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to the database!");
    })
    .catch((err) => {
      console.log("Cannot connect to the database!", err);
      process.exit();
    });

  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite;
  if (!isProd) {
    vite = await (
      await import("vite")
    ).createServer({
      base: "/",
      root,
      logLevel: isTest ? "error" : "info",
      server: {
        middlewareMode: true,
        watch: {
          usePolling: true,
          interval: 100,
        },
        hmr: {
          port: hmrPort,
        },
      },
      appType: "custom",
    });
    app.use(vite.middlewares);
  } else {
    app.use((await import("compression")).default());
    app.use(
      "/",
      (await import("serve-static")).default(resolve("dist/client"), {
        index: false,
      })
    );
  }
  app.use(apiRouter);

  app.use("*", async (req, res) => {
    try {
      const url = req.originalUrl;
      let template, render;
      if (!isProd) {
        template = fs.readFileSync(resolve("index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule("/src/entry-server.js")).render;
      } else {
        template = indexProd;
        render = (await import("./dist/server/entry-server.js")).render;
      }

      const [appHtml, preloadLinks] = await render(url, manifest);

      const html = template
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--app-html-->`, appHtml);

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      vite && vite.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  return { app, vite };
}

if (!isTest) {
  createServer().then(({ app }) =>
    app.listen(6173, () => {
      console.log("http://localhost:6173");
    })
  );
}
