const express = require("express");
const router = express();
const Category = require("../models/Category");

router.get("/", (req, res, next) => {
    
    Category.find().then(function (categories) {
        res.render("main/index", {
            userinfo: req.userinfo,
            category: categories
        })
    })

})

module.exports = router;