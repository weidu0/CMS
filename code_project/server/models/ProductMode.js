const mongoose = require("mongoose")

const Scheme = mongoose.Schema
//product模型===》products集合
const ProductType = {
    title: String,
    introduction: String,
    detail: String,
    cover: String,
    editTime: Date
}

const ProductMondel = mongoose.model("product", new Scheme(ProductType))

module.exports = ProductMondel