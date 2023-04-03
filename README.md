# vercel-express-demo

在Vercel部署Express，参考：<https://vercel.com/guides/using-express-with-vercel#standalone-express>

可能需要具备几个条件：

* 需要一个 `api` 目录
* 所有的请求都在这里面，其route也是对应的以 `api` 开头。
* 需要 `vercel.json`

当然静态文件，或者一些中间件，似乎依然要放在根目录下的 `app.js` 。但是 `app.js` 里面写的路由请求没有作用。

差不多就这些了。

比如我这个例子可访问路径：

* https://vercel-express-demo-api.vercel.app/api
* https://vercel-express-demo-api.vercel.app/api/item/4
* https://vercel-express-demo-api.vercel.app/api/test2
