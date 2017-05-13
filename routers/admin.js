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

    // 从数据库中读取所有用户数据
    User.find().then(function (users) {
        res.render("admin/user.html", {
            userinfo: req.userinfo,
            users: users
        })
    })

    
})

module.exports = router;
