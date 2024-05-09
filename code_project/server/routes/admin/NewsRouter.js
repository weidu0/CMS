var express = require('express');
const NewsContrller = require('../../controllers/admin/NewsContrller');

var NewsRouter = express.Router();
//图片上传模块解决 "Content-Type": "multipart/form-data",问题
const multer = require('multer')
const upload = multer({ dest: 'public/newsuploads/' })
NewsRouter.post("/adminapi/news/add", upload.single('file'), NewsContrller.add)
NewsRouter.get("/adminapi/news/list", NewsContrller.getList)
NewsRouter.post("/adminapi/news/list", upload.single('file'), NewsContrller.updateList)
NewsRouter.get("/adminapi/news/list/:id", NewsContrller.getList)
NewsRouter.put("/adminapi/news/pubilsh", NewsContrller.publish)
NewsRouter.delete("/adminapi/news/list/:id", NewsContrller.delList)

module.exports = NewsRouter;