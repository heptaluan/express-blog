const express = require("express");
const router = express();
const Category = require("../models/Category");
const Content = require("../models/Content");

// 前台内容首页
router.get("/", (req, res, next) => {

    var data = {
        page: Number(req.query.page || 1),
        limit: 10,
        pages: 0,
        userinfo: req.userinfo,
        categories: [],
        count: 0,
        link: "/"
    }
    
    // 读取分类信息
    Category.find().then(function (categories) {

        data.categories = categories

        // 读取内容的总记录数目
        return Content.count();

    }).then(function (count) {

        data.count = count;

        data.pages = Math.ceil(data.count / data.limit);
        data.page = Math.min(data.page, data.pages);
        data.page = Math.max(data.page, 1);
        var skip = (data.page - 1) * data.limit;

        // 读取文件列表
        return Content.find().limit(data.limit).skip(skip).populate(["category", "user"]).sort({ addTime: -1 })


    }).then(function (contents) {

        data.contents = contents;

        console.log(data)
        
        res.render("main/index", data)
    })

})

module.exports = router;