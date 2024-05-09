


const NewsService = require("../../services/admin/NewsService")


const NewsContrller = {
    add: async (req, res) => {
        //调用service进行添加
        const cover = req.file ? `/newsuploads/${req.file.filename}` : ''
        const { title, content, category, isPublish } = req.body
        await NewsService.add({
            title,
            content,
            category: Number(category),
            isPublish: Number(isPublish),
            cover,
            editTime: new Date()
        })
        res.send({
            ActionType: "OK",

        })
    },
    updateList: async (req, res) => {
        const cover = req.file ? `/newsuploads/${req.file.filename}` : ''
        const { title, content, category, isPublish, _id } = req.body
        await NewsService.updateList({
            _id,
            title,
            content,
            category: Number(category),
            isPublish: Number(isPublish),
            cover,
            editTime: new Date()
        })
        res.send({
            ActionType: "OK",

        })
    },
    getList: async (req, res) => {
        const result = await NewsService.getList({ _id: req.params.id })
        res.send({
            ActionType: "OK",
            data: result
        })
    },

    publish: async (req, res) => {
        const { _id, isPublish } = req.body
        await NewsService.publish({

            _id,
            isPublish: Number(isPublish),
            editTime: new Date()
        })
        res.send({
            ActionType: "OK",

        })
    }, delList: async (req, res) => {
        //console.log(req.params.id)
        await NewsService.delList({ _id: req.params.id })
        res.send({
            ActionType: "OK",

        })
    },

}

module.exports = NewsContrller 