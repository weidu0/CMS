const ProductMondel = require("../../models/ProductMode")

const ProductService = {

    getList: async ({ _id }) => {
        return _id ? ProductMondel.find({ _id }) : ProductMondel.find()
    },



}
module.exports = ProductService