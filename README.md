# vercel-express-demo

在Vercel部署Express，参考：<https://vercel.com/guides/using-express-with-vercel#standalone-express>

可能需要具备几个条件：

* 需要一个`api`目录
* 所有的请求都在这里面，其route也是对应的以`api`开头。
* 需要`vercel.json`

差不多就这些了。

比如我这个例子可访问路径：

* https://vercel-express-demo-api.vercel.app/api
* https://vercel-express-demo-api.vercel.app/api/item/4
