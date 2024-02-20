import catIcon from "@/public/icon/cat.svg";
import articleIcon from "@/public/icon/article.svg";
import dragonIcon from "@/public/icon/dragon.svg";
import Article from "@/pages/tabs-pages/article";
import About from "@/pages/tabs-pages/about";
import { Route } from "@/lib/type";
import Index from "@/pages/tabs-pages";

export const routes: Route[] = [
  {
    title: "首页",
    icon: catIcon,
    id: "0",
    path: "/",
    element: <Index />,
  },
  {
    title: "文章",
    icon: articleIcon,
    id: "1",
    path: "/article",
    element: <Article />,
  },
  {
    title: "关于",
    icon: dragonIcon,
    id: "2",
    path: "/about",
    element: <About />,
  },
];
