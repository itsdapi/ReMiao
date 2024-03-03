import SvgIcon from "@/ui/svg-icon";
import catIcon from "@/public/icon/cat.svg";
import articleIcon from "@/public/icon/article.svg";
import dragonIcon from "@/public/icon/dragon.svg";
import { switchTab } from "@tarojs/taro";
// @ts-ignore
import theme from "@/lib/theme";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { changeActive } from "@/lib/redux/active-tab-slice";
import { Tab } from "@/lib/type";
import { config } from "@/lib/config";
import "./index.css"

export default function Tabbar() {
  const { active } = useSelector((state: RootState) => state.activeTab);
  const dispatch = useDispatch<AppDispatch>();
  const primaryColor = theme.colors.primary;
  const handleTabChange = (id: number, path: string) => {
    dispatch(changeActive(id));
    switchTab({ url: path });
  };

  const tabs: Tab[] = [
    {
      text: "图鉴",
      url: "index",
      icon: catIcon,
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
      icon: dragonIcon,
      id: 2,
    },
  ];

  return (
    <div
      className={'white-glass'}
      style={{
        display: "flex",
        paddingTop: "0.75rem",
        flexDirection: "row",
        justifyContent: "space-around",
        borderTopWidth: "2px",
        borderColor: "#E5E7EB",
        width: "100%",
        height: `${config.app.tabbarHeight}rem`,
      }}
    >
      {tabs.map((item) => (
        <div
          style={{
            display: "flex",
            marginTop: "0.25rem",
            flexDirection: "column",
            alignItems: "center",
          }}
          key={item.id}
          onClick={() => handleTabChange(item.id, item.url)}
        >
          <SvgIcon
            src={item.icon}
            size={20}
            color={active === item.id ? primaryColor[900] : "#6B7280"}
          />
          <span
            style={{
              color: active === item.id ? primaryColor[900] : "#6B7280",
            }}
          >
            {item.text}
          </span>
        </div>
      ))}
    </div>
  );
}
