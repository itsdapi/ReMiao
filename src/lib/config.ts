export const config = {
  api: {
    url: process.env.TARO_APP_API,
  },
  app: {
    indexPagePath: "/pages/tabs-pages/index",
    aboutPagePath: "/pages/tabs-pages/about",
    catDetailPath: "/pages/none-tabs-pages/cat-detail",
    articleDetailPath: "/pages/none-tabs-pages/article-detail",
    loginPath: "/pages/none-tabs-pages/login",
    contactPath: "/pages/none-tabs-pages/contact",
    meHelpPath: "/pages/none-tabs-pages/me-help",
    settingPath: "/pages/none-tabs-pages/setting",
    debugPath: "/pages/none-tabs-pages/debug",
    postPath: "/pages/none-tabs-pages/post",
    tabbarHeight: 5,
    version: "1.0.2(Preview)",
    title: "莞工猫猫图鉴",
    // 颜色配置指南
    // 除了需要修改这里的颜色之外 还需要修改两处地方 一处是app.css 这个负责顶部状态栏的颜色
    // 还有一处是custom-tab-bar里面的css（sb小程序甚至都不让我读app.css）
    colors: {
      primary: {
        900: "#F4BA9D",
        600: "#F8D4AC",
        300: "#F8E7CA",
        200: "#FAF0E0",
        100: "#fffdf8",
      },
      secondary: {
        900: "#574835",
        800: "#766A57",
        700: "#9A8C78",
        600: "#BFB09C",
        500: "#F2E3D0",
        100: "#F5F4EE",
      },
      tertiary: {
        900: "#300406",
        800: "#623136",
        700: "#774448",
        600: "#885457",
        500: "#AF787B",
      },
    },
  },
};
