export const config = {
  api: {
    url: process.env.TARO_APP_API,
  },
  app: {
    indexPagePath: "/pages/tabs-pages/index",
    catDetailPath: "/pages/none-tabs-pages/cat-detail",
    tabbarHeight: 5,
    title: "莞工猫猫图鉴",
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
