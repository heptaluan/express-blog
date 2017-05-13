const express = require("express");
const router = express();
const User = require("../models/User");

router.use(function (req, res, next) {
    
    // 如果当前用户是非管理员
    if (!req.userinfo.isAdmin) {
        res.send("只有管理员才可以进入后台管理")
    }
    next()
})

router.get("/", function (req, res, next) {
    res.render("admin/index", {
        userinfo: req.userinfo
    })
})

// 用户管理
router.get("/user", function (req, res, next) {

    // 从数据库中读取所有用户数据，需要用到下面几个方法

    // limit(Number) 来获取分页数据
    // skip() 忽略数据的条数

    // 获取前台发送过来的 page ===>  ?page=1
    var page = Number(req.query.page || 1);

    // 每页展示几条数据
    var limit = 2;

    // 总页数
    var pages = 0;

    // 因为是异步操作，所以需要先查询到数据后在进行渲染
    User.count().then(function (count) {

        // 限定页数范围
        pages = Math.ceil(count / limit);
        // page 取值不能超过 pages（总页数）
        page = Math.min(page, pages);
        // page 取值也不能小于 1
        page = Math.max(page, 1);

         // 获取数据的时候忽略前面多少条
        var skip = (page - 1) * limit;

        User.find().limit(limit).skip(skip).then(function (users) {
            res.render("admin/user.html", {
                userinfo: req.userinfo,
                users: users,

                // 总条树，每页多少条，共多少页，当前第几页
                count: count,
                limit: limit,
                pages: pages,
                page: page
            })
        })
    })

   
    
    

    
})

module.exports = router;
