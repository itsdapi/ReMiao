import SvgIcon from "@/ui/svg-icon";
import indexIcon from "@/public/icon/index.svg";
import articleIcon from "@/public/icon/article.svg";
import aboutIcon from "@/public/icon/about.svg";
import searchIcon from "@/public/icon/search.svg";
import { switchTab } from "@tarojs/taro";
// @ts-ignore
import { AppDispatch, RootState } from "@/lib/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { changeActive } from "@/lib/redux/active-tab-slice";
import { Tab } from "@/lib/type";
import { config } from "@/lib/config";
import "./index.css";

export default function Tabbar() {
  const { active } = useSelector((state: RootState) => state.activeTab);
  const dispatch = useDispatch<AppDispatch>();
  const colors = config.app.colors;
  const handleTabChange = (id: number, path: string) => {
    dispatch(changeActive(id));
    switchTab({ url: path });
  };

  const tabs: Tab[] = [
    {
      text: "图鉴",
      url: "index",
      icon: indexIcon,
      id: 0,
    },
    {
      text: "文章",
      url: "article",
      icon: articleIcon,
      id: 1,
    },
    {
      text: "关于",
      url: "about",
      icon: aboutIcon,
      id: 2,
    },
    {
      text: "搜索",
      url: "search",
      icon: searchIcon,
      id: 3,
    },
  ];

  return (
    <div
      className={"white-glass"}
      style={{
        display: "flex",
        paddingTop: "0.75rem",
        flexDirection: "row",
        justifyContent: "space-around",
        borderTop: "solid 1px #E5E7EB",
        width: "100%",
        height: `${config.app.tabbarHeight}rem`,
      }}
    >
      {tabs.map((item) => (
        <div
          style={{
            display: "flex",
            // marginTop: "0.25rem",
            flexDirection: "column",
            alignItems: "center",
          }}
          key={item.id}
          onClick={() => handleTabChange(item.id, item.url)}
        >
          <SvgIcon
            src={item.icon}
            size={30}
            color={active === item.id ? colors.primary[900] : "#6B7280"}
          />
          {/*<span*/}
          {/*  style={{*/}
          {/*    paddingTop: "0.2rem",*/}
          {/*    fontSize: "0.8rem",*/}
          {/*    color: active === item.id ? primaryColor[900] : "#6B7280",*/}
          {/*  }}*/}
          {/*>*/}
          {/*  {item.text}*/}
          {/*</span>*/}
        </div>
      ))}
    </div>
  );
}
