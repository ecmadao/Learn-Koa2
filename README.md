# Learn-Koa2

一个由Koa2和React搭建的ToDo-List App

> Node菜鸟简单记录一下学习Koa2的过程，该项目为系列文章的源码

> 需要读者已经熟悉js以及ES6，了解npm和express

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

```bash
$ git clone git@github.com:ecmadao/Learn-Koa2.git
$ cd Learn-Koa2
$ npm install
```

然后要配置`MongoDB`，启动`127.0.0.1:27017`连接，并创建`koa2-todo`。否则就根据自己的实际情况修改`config/default.json`文件里的`mongodb url`

> MongoDB入门与本地配置推荐：[MongoDB 极简实践入门](https://github.com/StevenSLXie/Tutorials-for-Web-Developers/blob/master/MongoDB%20%E6%9E%81%E7%AE%80%E5%AE%9E%E8%B7%B5%E5%85%A5%E9%97%A8.md)

配置好并启动`MongoDB`之后，

```bash
$ npm run rock_dev
# then open localhost:7000
```

## License

Apache License 2.0
