// 用户表的定义，表示的就是定义数据库表的结构
const mongoose = require("mongoose");

// 分类表的结构
module.exports = new mongoose.Schema({

    // 分类名
    cateName: String,

})