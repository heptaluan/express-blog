基于 `express + mongodb` 搭建的一个博客系统

功能基本完善

前台功能包括登录、注册、发表文章，发表评论等

后台功能包括用户列表、评论列表、文章列表等相关管理操作（增删改查）

依赖的第三方包和各个版本见 `package.json`

算是一个练手项目，扩展一下后台方面的，比如 `cookie`，模版引擎，数据库操作方面等相关知识

----

----

目录结构为：

```js
├── app.js          入口文件
├── db              数据库存储目录
├── models          数据库模型文件目录
│   ├── User.js
│   └── ...
├── routers         路由文件
│   ├── admin.js
│   ├── main.js
│   ├── api.js
│   └── ...
├── schemas         数据库视图文件目录
│   ├── user.js
│   └── ...
├── node_modules/
├── package.json
├── public          公共文件目录
│   ├── img
│   ├── css
│   ├── js
│   └── ...
└── views
    ├── user.html   模版目录
    ├── index.html
    └── ...
```

----

----

## Use

```js
npm install
```

然后开启 `mongodb` 服务

```js
mongod --dbpath "项目所在文件夹下的 ==> \db" --port 27018
```

`mongodb` 默认的为 `27017` 端口，可能会被占用，故选用 `27018` 端口

然后访问 `localhost:3000`

注：权限功能暂时没有添加，需要到数据库中自行添加帐号为 `admin` 权限方可使用后台功能



