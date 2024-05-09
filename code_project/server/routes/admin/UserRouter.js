var express = require('express');
const UserController = require('../../controllers/admin/UserContrller');
var usersRouter = express.Router();

//图片上传模块解决 "Content-Type": "multipart/form-data",问题
const multer = require('multer')
const upload = multer({ dest: 'public/avataruploads/' })
usersRouter.post("/adminapi/user/login", UserController.login)
usersRouter.post("/adminapi/user/upload", upload.single('file'), UserController.upload)
usersRouter.post("/adminapi/user/add", upload.single('file'), UserController.add)
//实现用户列表的增删修查询
usersRouter.get("/adminapi/user/list", UserController.getList)
usersRouter.get("/adminapi/user/list/:id", UserController.getList)
usersRouter.put("/adminapi/user/list/:id", UserController.putList)
usersRouter.delete("/adminapi/user/list/:id", UserController.delList)


module.exports = usersRouter;
