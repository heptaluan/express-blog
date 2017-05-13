const express = require("express");
const router = express();
const User = require("../models/User");

// 统一返回格式
var responseData;

router.use(function (req, res, next) {
    responseData = {
        code: 10000,
        message: ""
    }
    next();
})


// 用户注册
router.post("/user/register", (req, res, next) => {

    var username = req.body.username;
    var password = req.body.password;
    var repassword = req.body.repassword;

    console.log(password)
    
    // 仅判断用户名是否已经注册
    User.findOne({
        username: username
    }).then(function (userinfo) {

        // 如果数据库中有该条记录，则证明已经注册过
        if (userinfo) {
            responseData.code = 4;
            responseData.message = "用户名已经被注册"
            res.json(responseData);
            return
        } 

        // 否则，保存用户的注册信息到数据库
        var user = new User({
            username: username,
            password: password
        })

        


        return user.save();

    }).then(function (new_user_info) {
        responseData.message = "注册成功"
        res.json(responseData);
    })

})


// 登录
router.post("/user/login", (req, res, next) => {

    var username = req.body.username;
    var password = req.body.password;
    
    // 仅判断用户名是否已经注册
    User.findOne({
        username: username,
        password: password
    }).then(function (userinfo) {

        // 如果数据库中有该条记录，则证明已经注册过
        if (!userinfo) {
            responseData.code = 2;
            responseData.message = "用户名或密码错误"
            res.json(responseData);
            return
        } 



        // 否则就登录成功
        responseData.code = 10000;
        responseData.message = "登录成功"
        responseData.userinfo = {
            _id: userinfo._id,
            username: userinfo.username
        }
        
        req.cookies.set("userinfo", JSON.stringify({
            _id: userinfo._id,
            username: userinfo.username
        }));

        res.json(responseData);

        

    })

})


// 退出
router.get("/user/logout", (req, res) => {

    req.cookies.set("userinfo", null);
    res.json(responseData);

})





module.exports = router;