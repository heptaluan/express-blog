$(function () {
    
    // 注册
    $("#register").on("click", function () {
        console.log( $("input[name=username]").val() )
        $.ajax({
            url: "/api/user/register",
            type: "post",
            data: {
                username: $("#regsiterBox input[name=username]").val(),
                password: $("#regsiterBox input[name=password]").val(),
                repassword: $("#regsiterBox input[name=passwordRepeat]").val()
            },
            dataType: "json",
            success: function (data) {
                console.log(data);
            }
        })
    })

    // 去注册页面
    $("#to-regsiter").on("click", function () {
        $("#loginBox").hide();
        $("#regsiterBox").show();
    })

    // 登录
    $("#login").on("click", function () {
        $.ajax({
            url: "/api/user/login",
            type: "post",
            data: {
                username: $("#loginBox input[name=username]").val(),
                password: $("#loginBox input[name=password]").val(),
            },
            dataType: "json",
            success: function (data) {
                if (data.code == 10000) {
                    window.location.reload();
                }
            }
        })
    })

    // 去登录页面
    $("#to-login").on("click", function () {
        $("#regsiterBox").hide();
        $("#loginBox").show();
    })

    

    // 退出
    $("#logout").on("click", function () {
        $.ajax({
            url: "/api/user/logout",
            success: function (data) {
                if (data.code == 10000) {
                    window.location.reload();
                }
            }
        })
    })

})