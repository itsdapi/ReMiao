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
    // "pages/login",
    "pages/tabs-pages/index",
    "pages/tabs-pages/article",
    "pages/tabs-pages/about",
    "pages/tabs-pages/search",
    "pages/error",
    "pages/none-tabs-pages/cat-detail",
    "pages/none-tabs-pages/article-detail",
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
  },
});
