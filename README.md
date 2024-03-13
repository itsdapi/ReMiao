# 莞工喵喵小程序图鉴

这个项目是之前原生开发的图鉴程序的重写 因为处女作品留下了太多的问题

然后也缩减了不少的功能 这个项目只会留下最简单的图鉴、文章、管理功能 去除了社区功能（如果后期政策有变的话可以重新写^^）

项目技术栈 `Taro`, `typescript`, `tailwindcss`, `react`, `redux`, `redux-toolbox`

后端在 [这个repo](https://github.com/xqe2011/kitty_backend)

# 使用指南

### 注意

项目开发用的Node21版本，低版本如16不确定会不会遇到其他问题

使用需要建立`.env.development`和`.env.production`两个文件 里面需要填写的东西可以在`.env.template`中找到 注意每一项都要有
不能缺

### 开发

```shell
npm run dev:weapp
```

### 构建

```shell
npm run build:weapp
```
