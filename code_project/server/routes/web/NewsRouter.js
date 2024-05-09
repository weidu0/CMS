var express = require('express');
const NewsContrller = require('../../controllers/web/NewsContrller');
var NewsRouter = express.Router();

NewsRouter.get("/webapi/news/list", NewsContrller.getList)
NewsRouter.get("/webapi/news/list/:id", NewsContrller.getList)
NewsRouter.get("/webapi/news/toplist", NewsContrller.getTopList)


module.exports = NewsRouter;