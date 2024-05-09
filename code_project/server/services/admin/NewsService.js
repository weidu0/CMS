const NewsMondel = require("../../models/NewsMode")

const NewsService = {
    add: async ({ title, content, category, cover, isPublish, editTime }) => {
        return NewsMondel.create({
            title, content, category, cover, isPublish, editTime
        })
    },
    updateList: async ({ _id, title, content, category, isPublish, cover, editTime }) => {
        if (cover) {
            return NewsMondel.updateOne(
                {
                    _id
                },
                {
                    title, content, category, isPublish, cover, editTime
                })

        } else {
            return NewsMondel.updateOne(
                {
                    _id
                },
                {
                    title, content, category, isPublish, editTime
                })
        }
    },
    getList: async ({ _id }) => {
        return _id ? NewsMondel.find({ _id }) : NewsMondel.find({})
    },
    publish: async ({ _id, isPublish, editTime }) => {
        return NewsMondel.updateOne(
            {

                _id
            },
            {
                isPublish,
                editTime
            }
        )
    }, delList: async ({ _id }) => {
        return NewsMondel.deleteOne({ _id })
    },


}
module.exports = NewsService