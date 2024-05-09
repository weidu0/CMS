const mongoose = require("mongoose")

const Scheme = mongoose.Schema
//news 模型===》news集合
const NewsType = {
    title: String,
    content: String,
    category: Number,//类别，1 2 3
    cover: String,
    isPublish: Number,// 未发布，已经发布
    editTime: Date

}

const NewsMondel = mongoose.model("news", new Scheme(NewsType))

module.exports = NewsMondel