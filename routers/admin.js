const express = require("express");
const router = express();

// 引入模型
const User = require("../models/User");
const Category = require("../models/Category");

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


/**
 *  ========================  用户管理相关操作  ========================
 */
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
                page: page,
                link: "/admin/user"
            })
        })
    })

})



/**
 *  ========================  分类相关操作  ========================
 */
// 分类首页
router.get("/category", function (req, res, next) {
    
    // 同用户管理
    var page = Number(req.query.page || 1);
    var limit = 2;
    var pages = 0;

    Category.count().then(function (count) {

        // 限定页数范围
        pages = Math.ceil(count / limit);
        page = Math.min(page, pages);
        page = Math.max(page, 1);

        var skip = (page - 1) * limit;

        // sort() 方法可以用来排序（1 表示升序，-1 表示降序）
        Category.find().sort({_id: -1}).limit(limit).skip(skip).then(function (categories) {
            res.render("admin/category_index.html", {
                userinfo: req.userinfo,
                categories: categories,

                count: count,
                limit: limit,
                pages: pages,
                page: page,
                link: "/admin/category"
            })
        })
    })
})

// 增加分类（get 请求的话渲染一个页面）
router.get("/category/add", function (req, res, next) {
    res.render("admin/category_add", {
        userinfo: req.userinfo
    })
})

// 保存分类（post 请求的话接收提交过来的数据进行保存）
router.post("/category/add", function (req, res, next) {

    var cateName = req.body.cateName || "";

    console.log(cateName)

    if (cateName == "") {
        res.render("admin/error", {
            userinfo: req.userinfo,
            message: "名称不能为空"
        })
        return;
    }

    // 判断数据库中是否已经存在该分类
    Category.findOne({
        cateName: cateName
    }).then(function (rs) {
        if (rs) {
            // 表面数据库已有该分类
            res.render("admin/error", {
                userinfo: req.userinfo,
                message: "该分类已经存在"
            })
            return Promise.reject();
        } else {
            // 分类不存在，进行保存
            return new Category({
                cateName: cateName
            }).save()
        }
    }).then(function (newCategory) {
        res.render("admin/success", {
            userinfo: req.userinfo,
            message: "保存分类成功",
            url: "/admin/category"
        })
    })

})

// 修改分类
router.get("/category/edit", function (req, res) {

    // 获取要修改的分类信息，以表单形式展示
    var id = req.query.id;

    Category.findOne({
        _id: id
    }).then(function (category) {

        if (!category) {
            res.render("admin/error", {
                userinfo: req.userinfo,
                message: "分类信息不存在"
            })
        } else {
            res.render("admin/category_edit", {
                userinfo: req.userinfo,
                category: category
            })
        }
    })
})

// 分类编辑
router.post("/category/edit", function (req, res) {
    var id = req.query.id;
    var cateName = req.body.cateName || "";

    Category.findOne({
        _id: id
    }).then(function (category) {

        if (!category) {
            res.render("admin/error", {
                userinfo: req.userinfo,
                message: "分类信息不存在"
            })
            return Promise.reject();
        } else {
            
            // 如果用户没有做任何修改直接点了保存
            if (cateName == category.cateName) {
                res.render("admin/success", {
                    userinfo: req.userinfo,
                    message: "修改成功",
                    url: "/admin/category"
                })
                return Promise.reject();
            } else {
                // 判断一下修改后的分类在数据库中是否已经存在
                return Category.findOne({
                    _id: {$ne: id},
                    cateName: cateName
                })
            }
        }
    }).then(function (sameCategory) {
        console.log(id)
        if (sameCategory) {
            res.render("admin/error", {
                userinfo: req.userinfo,
                message: "已经存在同名分类"
            })
            return Promise.reject();
        } else {
            // 更新数据
            return Category.update({
                _id: id
            }, {
                cateName: cateName
            })
        }
    }).then(function () {
        res.render("admin/success", {
            userinfo: req.userinfo,
            message: "修改成功",
            url: "/admin/category"
        })
    })

})

// 删除分类
router.get("/category/delete", function (req, res) {

    // 获取要删除分类的 id
    var id = req.query.id;

    Category.remove({
        _id: id
    }).then(function () {
        res.render("admin/success", {
            userinfo: req.userinfo,
            message: "删除成功",
            url: "/admin/category"
        })
    })

})



/**
 *  ========================  文章内容相关操作  ========================
 */
// 内容首页
router.get("/content", function (req, res) {
    
    res.render("admin/content_index", {
        userinfo: req.userinfo
    })
})

// 内容添加页面
router.get("/content/add", function (req, res) {

    Category.find().then(function (categories) {
        res.render("admin/content_add", {
            userinfo: req.userinfo,
            categories: categories
        })
    })
    
    
})





module.exports = router;
