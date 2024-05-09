


const ProductService = require("../../services/admin/ProductService")


const ProductContrller = {
    add: async (req, res) => {
        //调用service进行添加
        const cover = req.file ? `/productuploads/${req.file.filename}` : ''
        const { title, introduction, detail } = req.body
        await ProductService.add({
            title,
            introduction,
            detail,
            cover,
            editTime: new Date()
        })
        res.send({
            ActionType: "OK",

        })
    },
    updateList: async (req, res) => {
        const cover = req.file ? `/productuploads/${req.file.filename}` : ''
        const { title, introduction, detail, _id } = req.body
        await ProductService.updateList({
            _id,
            title,
            introduction,
            detail,
            cover,
            editTime: new Date()
        })
        res.send({
            ActionType: "OK",

        })
    },
    getList: async (req, res) => {
        const result = await ProductService.getList({ _id: req.params.id })
        res.send({
            ActionType: "OK",
            data: result
        })
    },

    // publish: async (req, res) => {
    //     const { _id, isPublish } = req.body
    //     await NewsService.publish({

    //         _id,
    //         isPublish: Number(isPublish),
    //         editTime: new Date()
    //     })
    //     res.send({
    //         ActionType: "OK",

    //     })
    // },
    delList: async (req, res) => {
        //console.log(req.params.id)
        await ProductService.delList({ _id: req.params.id })
        res.send({
            ActionType: "OK",

        })
    },

}

module.exports = ProductContrller 