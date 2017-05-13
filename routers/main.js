const express = require("express");
const router = express();

router.get("/", (req, res, next) => {
    
    res.render("main/index", {
        userinfo: req.userinfo
    })

})

module.exports = router;