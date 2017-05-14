// 用户表的定义，表示的就是定义数据库表的结构
const mongoose = require("mongoose");

// 内容表的结构
module.exports = new mongoose.Schema({

    // 内容分类的 id （注意：定义为关联字段）
    category: {
        // 类型
        type: mongoose.Schema.Types.ObjectId,

        // 引用
        ref: "Category"
    },

    // 内容标题
    title: String,

    // 简介
    description: {
        type: String,
        default: ""
    },

    // 内容
    content: {
        type: String,
        default: ""
    },

    // 用户的 id （注意：定义为关联字段）
    user: {
        // 类型
        type: mongoose.Schema.Types.ObjectId,

        // 引用
        ref: "User"
    },

    // 添加时间
    addTime: {
        type: Date,
        default: new Date()
    },

    // 点击量，阅读数
    views: {
        type: Number,
        default: 0
    },

    // 文章对应的评论
    comments: {
        type: Array,
        default: []
    }

})