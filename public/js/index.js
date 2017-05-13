$(function () {
    
    // 注册
    $(".btn").on("click", function () {
        $.ajax({
            url: "/api/user/register",
            type: "post",
            data: {
                username: $(".user").val(),
                password: $(".pwd").val(),
                repassword: $(".repwd").val()
            },
            dataType: "json",
            success: function (data) {
                console.log(data);
            }
        })
    })

    // 登录
    $(".btn2").on("click", function () {
        $.ajax({
            url: "/api/user/login",
            type: "post",
            data: {
                username: $(".user2").val(),
                password: $(".pwd2").val(),
            },
            dataType: "json",
            success: function (data) {
                if (data.code == 10000) {
                    window.location.reload();
                }
            }
        })
    })

    // 退出
    $(".loginout").on("click", function () {
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