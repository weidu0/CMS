


const UserMondel = require("../../models/UserMode")

const UserService = {
    login: async ({ username, password }) => {
        return UserMondel.find({
            username,
            password
        })
    },
    upload: async ({ _id, username, introduction, gender, avatar }) => {


        if (avatar) {
            return UserMondel.updateOne(
                {
                    _id
                },
                {
                    username, introduction, gender, avatar
                })

        } else {
            return UserMondel.updateOne(
                {
                    _id
                },
                {
                    username, introduction, gender,
                })
        }

    },
    add: async ({ username, introduction, gender, avatar, password, role }) => {
        return UserMondel.create({
            username, introduction, gender, avatar, password, role
        })
    },
    putList: async (body) => {
        return UserMondel.updateOne({ _id: body._id }, body)
    },
    getList: async ({ id }) => {
        return id ? UserMondel.find({ _id: id }, ["username", "role", "introduction", "password"]) : UserMondel.find({}, ["username", "role", "avatar", "introduction", "gender"])
    },
    delList: async ({ _id }) => {
        return UserMondel.deleteOne({ _id })
    },

}
module.exports = UserService
