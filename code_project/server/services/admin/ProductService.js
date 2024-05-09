const ProductMondel = require("../../models/ProductMode")

const ProductService = {
    add: async ({ title, introduction, detail, cover, editTime }) => {
        return ProductMondel.create({
            title, introduction, detail, cover, editTime
        })
    },
    updateList: async ({ _id, title, introduction, detail, cover, editTime }) => {
        if (cover) {
            return ProductMondel.updateOne(
                {
                    _id
                },
                {
                    title, introduction, detail, cover, editTime
                })

        } else {
            return ProductMondel.updateOne(
                {
                    _id
                },
                {
                    title, introduction, detail, editTime
                })
        }
    },
    getList: async ({ _id }) => {
        return _id ? ProductMondel.find({ _id }) : ProductMondel.find({})
    },
    // publish: async ({ _id, isPublish, editTime }) => {
    //     return NewsMondel.updateOne(
    //         {

    //             _id
    //         },
    //         {
    //             isPublish,
    //             editTime
    //         }
    //     )
    // },
    delList: async ({ _id }) => {
        return ProductMondel.deleteOne({ _id })
    },


}
module.exports = ProductService