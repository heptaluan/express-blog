// app.js

// 加载 express
const express = require("express");

// 加载模版
const swig = require("swig");

// 加载 mongoose
const mongoose = require("mongoose");

// 加载 body-parser 用来处理 post 请求提交过来的数据
const bodyParser = require("body-parser");

// 加载 cookies 模块
const Cookies = require("cookies");

// 加载用户模型
const User = require("./models/User");





// 等同于 ==> http.createServer()
const app = express();

// 设置静态文件托管
// 当用户请求的路径是以 /public 开始的，则使用 express.static(__dirname + "/public") 进行处理
app.use("/public", express.static(__dirname + "/public"));



// 配置模版
// 定义当前使用的模版
// 第一个参数  表示模版引擎的名称，同时也是模版文件的后缀
// 第二个参数  表示用于解析处理模版内容的方法
app.engine("html", swig.renderFile);

// 设置模版文件存放的目录
// 第一个参数  必须是 views
// 第二个参数  为指定的目录
app.set("views", "./views")

// 注册所使用的模版引擎（把之前定义的模版引擎配置到 app 的应用当作）
// 第一个参数  必须是 view engine 
// 第二个参数  和 app.engine() 方法中定义的模版引擎的名称一致（第一个参数）
app.set("view engine", "html")

// 在开发过程中，需要取消掉模版的缓存
swig.setDefaults({ cache: false });


// ---------------------------------------------------------------------------

// 处理请求输出（路由绑定）
// 通过 app.get() 或者 app.post() 等方法可以把一个 url 路径和一个或多个函数进行绑定
// app.get("/", function (req, res, next) {})
// req  ==> request 对象，保存客户端请求相关的一些数据
// res  ==> response 对象，服务端输出对象，提供了一些服务端输出相关的一些方法
// next ==> 用于执行下一个和路径匹配的函数（中间件）

// 最后通过 res.send(string) 方法发送内容到客户端（内容输出）

// ---------------------------------------------------------------------------


// bodyParser 设置
// 会在请求的 req 对象身上增加一个 body 属性，body 里面保存的就是 post 过来的数据
app.use(bodyParser.urlencoded({ extended: true }))

// 设置 cookies
app.use(function (req, res, next) {

    req.cookies = new Cookies(req, res);

    req.userinfo = {};

    // 设立一个可以给任何路由来访问的全局变量，绑定到 req 对象上
    // 解析登录用户的 cookie 信息
    if (req.cookies.get("userinfo")) {
        try {
            req.userinfo = JSON.parse(req.cookies.get("userinfo"))

            // 获取当前登录用户的类型，是否为管理员
            User.findById(req.userinfo._id).then(function (userinfo) {
                req.userinfo.isAdmin = Boolean(userinfo.isAdmin)
                next()
            })
        } catch (e) {
            next()
        }
    } else {
        next()
    }
    
})

// 根据不同的功能划分模块
app.use("/admin", require("./routers/admin"))
app.use("/api", require("./routers/api"))
app.use("/", require("./routers/main"))





// 连接数据库
mongoose.connect("mongodb://localhost:27018/blog", function (err) {
    if (err) {
        console.log(`连接失败`)
    } else {
        console.log(`连接成功`)
        app.listen(3000, () => {
            console.log(`app is running at port 3000`)
        })
    }
});




