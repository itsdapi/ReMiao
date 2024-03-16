import { ListItemType } from "@/lib/type";
import { List, ListItem } from "@/ui/list";
import TopbarProvider from "@/ui/topbar";
import { config } from "@/lib/config";
import { navigateTo } from "@tarojs/taro";
import IndexIcon from "@/public/icon/index.svg";
import { PaddingBlock } from "@/ui/padding-block";

export default function Index() {
  // TODO: icon
  const list: ListItemType[] = [
    {
      id: 0,
      title: "管理猫咪",
      icon: IndexIcon,
      onClick: () => navigateTo({ url: config.app.catManageListPath }),
    },
    // {
    //   id: 1,
    //   title: "管理照片",
    //   icon: IndexIcon,
    //   onClick: () => navigateTo({ url: config.app.catManageListPath }),
    // },
  ];
  return (
    <>
      <TopbarProvider
        topClassName={"bg-primary-100"}
        className={"bg-primary-100 min-h-screen"}
        observeTargetSelector={"#content"}
        title={"管理页面"}
        back
      >
        <PaddingBlock />
        <List className={"rounded-2xl"}>
          {list.map((item) => (
            <ListItem
              key={item.id}
              title={item.title}
              onClick={item.onClick}
              icon={item.icon}
            />
          ))}
        </List>
      </TopbarProvider>
    </>
  );
}
