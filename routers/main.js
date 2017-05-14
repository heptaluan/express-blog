const express = require("express");
const router = express();
const Category = require("../models/Category");
const Content = require("../models/Content");

var data;

// 处理通用数据
router.use(function (req, res, next) {

    data = {
        userinfo: req.userinfo,
        categories: []
    }
    
    Category.find().then(function (categories) {
        data.categories = categories;
        next();
    })

})

// 前台内容首页
router.get("/", (req, res, next) => {

    data.page = Number(req.query.page || 1);
    data.limit = 4;
    data.pages = 0;
    data.count = 0;
    data.category = req.query.category || "";

    var where = {};
    if (data.category) {
        where.category = data.category;
    }
    
    // 读取分类信息

    Content.count().then(function (count) {

    data.count = count;

    data.pages = Math.ceil(data.count / data.limit);
    data.page = Math.min(data.page, data.pages);
    data.page = Math.max(data.page, 1);
    var skip = (data.page - 1) * data.limit;

    // 读取文件列表
    return Content.where(where).find().limit(data.limit).skip(skip).populate(["category", "user"]).sort({ addTime: -1 })


    }).then(function (contents) {

        data.contents = contents;

        // console.log(data)
        
        res.render("main/index", data)
    })

})


// 查看文章详情
router.get("/view", function (req, res, next) {

    var contentid = req.query.contentid || "";

    Content.findOne({
        _id: contentid
    }).populate("user").then(function (content) {

        data.content = content;

        // 更新阅读数
        content.views++;
        content.save();

        
        // console.log(data)
        res.render("main/view", data)
    })

})

module.exports = router;