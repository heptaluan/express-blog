$(function () {
    
    
    // 注册
    $("#register").on("click", function () {
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


    // 进入详情时获取评论列表
    var commentId = window.location.href.split("contentid=")[1];
    $.ajax({
        url: "/api/commentList",
        data: {
            commentId: commentId
        },
        success: function (data) {

            comments = data.reverse();
            renderComment(comments)

        }
    })

    // 文章评论
    $("#submit-comment").on("click", function () {
        $.ajax({
            type: "post",
            url: "/comment",
            data: {
                commentId: commentId,
                content: $("#comment-content").val()
            },
            success: function (data) {
                comments = data.comments.reverse();
                renderComment(comments)
            }
        })
    })

    function renderComment (comments) {
        $("#commentNum span, .commentsLength").html(comments.length)
        var html = "";
        for (var i = 0; i < comments.length; i++) {
            var data = comments[i];
            html += `<li class="list-group-item">
                        <h4 class="list-group-item-heading">
                            ${data.username}
                            <span class="badge">${formatDate(`${data.time}`)}</span>
                        </h4>
                        <p class="list-group-item-text">
                            ${data.content}
                        </p>
                    </li>`;
        }

        if (comments.length == 0) {
            $(".list-group").html("暂时还没有评论")
        } else {
            $(".list-group").html(html)
        }

        
        $("#comment-content").val("");
    }


    function formatDate (time) {
        var date = new Date(time);
        return date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDay() + "日"
    }


    

})