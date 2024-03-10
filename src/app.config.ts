import { config } from "@/lib/config";
import { routes } from "@/lib/route";

export default defineAppConfig({
  lazyCodeLoading: "requiredComponents",
  // renderer: "skyline",
  // componentFramework: "glass-easel",
  // rendererOptions: {
  //   skyline: {
  //     defaultDisplayBlock: false,
  //   },
  // },
  pages: [
    "pages/tabs-pages/index",
    "pages/tabs-pages/article",
    "pages/tabs-pages/about",
    "pages/tabs-pages/search",
    "pages/error",
    "pages/none-tabs-pages/cat-detail",
    "pages/none-tabs-pages/article-detail",
    "pages/none-tabs-pages/login",
    "pages/none-tabs-pages/me-help",
    "pages/none-tabs-pages/setting",
    "pages/none-tabs-pages/contact",
    "pages/none-tabs-pages/debug",
    "pages/none-tabs-pages/post",
  ],
  tabBar: {
    list: routes,
    custom: true,
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: config.app.title,
    navigationBarTextStyle: "black",
    navigationStyle: "custom",
    backgroundColor: config.app.colors.primary[100],
  },
});
