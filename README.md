# Learn-Koa2

一个由Koa2和React搭建的ToDo-List App

> Node菜鸟简单记录一下学习Koa2的过程，该项目为系列文章的源码

> 需要读者已经熟悉js以及ES6，了解npm和express

## Play Online Demo

[koa2-todolist](https://koa2-todolist.herokuapp.com)

## Menu

1. [middleware](https://github.com/ecmadao/Coding-Guide/blob/master/Notes/NodeJS/KOA/learn%20koa2--middleware.md)
2. [router](https://github.com/ecmadao/Coding-Guide/blob/master/Notes/NodeJS/KOA/learn%20koa2--router.md)
3. [controller & template](https://github.com/ecmadao/Coding-Guide/blob/master/Notes/NodeJS/KOA/learn%20koa2--controller%20%26%20template.md)
4. [context](https://github.com/ecmadao/Coding-Guide/blob/master/Notes/NodeJS/KOA/learn%20koa2--context.md)
5. [model & mongodb](https://github.com/ecmadao/Coding-Guide/blob/master/Notes/NodeJS/KOA/learn%20koa2--model%20%26%20mongodb.md)
6. [认证](https://github.com/ecmadao/Coding-Guide/blob/master/Notes/NodeJS/KOA/learn%20koa2--%E8%AE%A4%E8%AF%81.md)
7. work with frontend
8. [tools](https://github.com/ecmadao/Coding-Guide/blob/master/Notes/NodeJS/KOA/learn%20koa2--tools.md)

## Gitbook

- [Learn Koa2](https://ecmadao.gitbooks.io/learn-koa2/content/)

## Playground

> 本地玩起来

### prepare

```bash
$ git clone git@github.com:ecmadao/Learn-Koa2.git
$ cd Learn-Koa2
$ npm install
```

### config

- 配置`MongoDB`

  - 启动`127.0.0.1:27017`连接，并创建`koa2-todo`数据库。否则就根据自己的实际情况修改`config/default.json`文件里的`mongodb url`

> MongoDB入门与本地配置推荐：[MongoDB 极简实践入门](https://github.com/StevenSLXie/Tutorials-for-Web-Developers/blob/master/MongoDB%20%E6%9E%81%E7%AE%80%E5%AE%9E%E8%B7%B5%E5%85%A5%E9%97%A8.md)

- [新建一个`OAuth application`](https://github.com/settings/applications/new)

  - `Application name`：`Koa2-Todo`
  - `Homepage URL`：`http://localhost:7000`
  - `Authorization callback URL`：`http://localhost:7000/user/login/github`

`Application name`可以修改成其他值，但要和`config/default.json`中的`githubConfig appName`一致

`Homepage URL`和`Authorization callback URL`的7000端口可以自定义，不过要记得修改`app/app.js`里最后的启动端口

创建好以后，把获取的`clientId`和`clientSecret`分别填入`config/default.json`中的`githubConfig clientId`和`githubConfig clientSecret`里

> 关于Github `OAuth application`的更多内容，可以查阅：[使用github作为第三方登录](https://github.com/ecmadao/Coding-Guide/blob/master/Notes/NodeJS/KOA/learn%20koa2--%E8%AE%A4%E8%AF%81.md#附加--使用github作为第三方登录)

```bash
$ npm run rock_dev
# then open localhost:7000
```

## License

Apache License 2.0
