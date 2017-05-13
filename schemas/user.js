// 用户表的定义，表示的就是定义数据库表的结构
const mongoose = require("mongoose");

// 定义表的结构
module.exports = new mongoose.Schema({

    // 用户名
    username: String,

    // 密码
    password: String,

    // 是否为管理员
    isAdmin: {
        type: Boolean,
        default: false
    }
})