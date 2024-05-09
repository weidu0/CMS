var express = require('express');
const ProductContrller = require('../../controllers/admin/ProductContrller');

var ProductRouter = express.Router();
//图片上传模块解决 "Content-Type": "multipart/form-data",问题
const multer = require('multer')
const upload = multer({ dest: 'public/Productuploads/' })
ProductRouter.post("/adminapi/product/add", upload.single('file'), ProductContrller.add)
ProductRouter.get("/adminapi/product/list", ProductContrller.getList)
ProductRouter.post("/adminapi/product/list", upload.single('file'), ProductContrller.updateList)
ProductRouter.get("/adminapi/product/list/:id", ProductContrller.getList)
// NewsRouter.put("/adminapi/news/pubilsh", NewsContrller.publish)
ProductRouter.delete("/adminapi/product/list/:id", ProductContrller.delList)

module.exports = ProductRouter;