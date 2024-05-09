const NewsMondel = require("../../models/NewsMode")

const NewsService = {

    getList: async ({ _id }) => {
        return _id ? NewsMondel.find({ _id, isPublish: 1 }) : NewsMondel.find({ isPublish: 1 }).sort({ editTime: -1 })
    },
    //从数据库查出 limit 条数据
    getTopList: async ({ limit }) => {
        return NewsMondel.find({ isPublish: 1 }).sort({ editTime: -1 }).limit(limit)
    },


}
module.exports = NewsService