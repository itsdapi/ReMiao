import TopbarProvider from "@/ui/topbar";
import { PaddingBlock, PaddingBottom } from "@/ui/padding-block";
import OrgInfo from "@/ui/components/org-info";
import User from "@/ui/components/user";
import { List, ListItem } from "@/ui/list";
import { navigateTo } from "@tarojs/taro";
import { ListItemType } from "@/lib/type";
import { config } from "@/lib/config";
import PhoneIcon from "@/public/icon/phone.svg";
import ClapIcon from "@/public/icon/about.svg";

export default function About() {
  const list: ListItemType[] = [
    {
      id: 0,
      title: "联系方式",
      icon: PhoneIcon,
      onClick: () => navigateTo({ url: config.app.contactPath }),
    },
    {
      id: 1,
      title: "我想提供帮助",
      icon: ClapIcon,
      onClick: () => navigateTo({ url: config.app.meHelpPath }),
    },
    // {
    //   id: 2,
    //   title: "设置",
    //   icon: SettingIcon,
    //   onClick: () => navigateTo({ url: config.app.settingPath }),
    // },
  ];
  return (
    <TopbarProvider
      topClassName={"bg-primary-100"}
      className={"bg-primary-100 min-h-screen"}
      observeTargetSelector={"#content"}
      title={"关于"}
    >
      <div className={"mx-5 mb-8"}>
        <PaddingBlock />
        <div id={"content"} className={"space-y-3"}>
          <OrgInfo />
          <User />
        </div>
      </div>
      <List className={"rounded-2xl"}>
        {list.map((item) => (
          <ListItem
            key={item.id}
            title={item.title}
            onClick={item.onClick}
            icon={item.icon}
          />
        ))}
        <div
          className={"text-sm font-light text-center text-secondary-800 mt-8"}
        >
          <p>来自莞工爱猫人士 用 ❤️ 制作</p>
          <p>@喵莞家</p>
          <p>{`v${config.app.version} ${config.app.build}`}</p>
        </div>
      </List>
      <PaddingBottom className={"bg-white"} />
    </TopbarProvider>
  );
}
