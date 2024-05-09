var express = require('express');
const ProductContrller = require('../../controllers/web/productContrller');
var ProductRouter = express.Router();

ProductRouter.get("/webapi/product/list", ProductContrller.getList)



module.exports = ProductRouter