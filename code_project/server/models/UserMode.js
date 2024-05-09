const mongoose = require("mongoose")

const Scheme = mongoose.Schema
//user 模型===》users集合
const UserType = {
    username: String,
    password: String,
    gender: Number,
    introduction: String,
    avatar: String,
    role: Number

}

const UserMondel = mongoose.model("user", new Scheme(UserType))

module.exports = UserMondel