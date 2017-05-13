// 用户表的定义，表示的就是定义数据库表的结构
const mongoose = require("mongoose");

// 内容表的结构
module.exports = new mongoose.Schema({

    // 内容分类的 id （注意：定义为关联字段）
    category: {
        // 类型
        type: mongoose.Schema.Types.ObjectId,

        // 引用
        ref: "Content"
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
    }

})