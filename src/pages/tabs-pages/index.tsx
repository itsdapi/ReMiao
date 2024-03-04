import { config } from "@/lib/config";
import { getCatList } from "@/lib/miao-api/cat";
import { CatList } from "@/lib/miao-api/type";
import { RootState } from "@/lib/redux/store";
import { CardXL, Notification } from "@/ui/cards";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Title from "@/ui/title";
import TopbarProvider from "@/ui/topbar";
import VirtialList from "@/ui/virtual-list";
import TagSelector from "@/ui/tag-selector";
import { Tag } from "@/lib/type";
import { navigateTo } from "@tarojs/taro";
import PaddingBlock from "@/ui/padding-block";

export default function Index() {
  const fileUrl = useSelector((state: RootState) => state.login.data?.fileUrl);
  const batchCount = 20;
  const [pageNum, setPageNum] = useState(1);
  const [NotifShow, setNotifShow] = useState(true);
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    const initData = async () => {
      setData(await getCatList(batchCount, 0));
    };
    initData();
  }, []);

  const tags: Tag[] = [
    { id: "0", name: "black" },
    { id: "1", name: "white" },
    { id: "2", name: "yellow" },
    { id: "3", name: "green" },
    { id: "4", name: "orange" },
    { id: "5", name: "pink" },
    { id: "6", name: "cyan" },
  ];

  const topElement = () => {
    return (
      <>
        <PaddingBlock />
        <div className={"space-y-2 mb-2"}>
          <Notification
            setShowFn={setNotifShow}
            isShow={NotifShow}
            title={"速看"}
            text={"1233211232424"}
          />
          <Title>{config.app.title}</Title>
          <TagSelector tags={tags} />
        </div>
      </>
    );
  };

  const bottomElement = () => {
    return (
      <div
        style={{ height: `${config.app.tabbarHeight + 2}rem` }}
        className={"w-full"}
      />
    );
  };

  const handleScrollToLower = async () => {
    // console.log(`trigger load data pageNum: ${pageNum}`);
    const newData = await getCatList(batchCount, pageNum * batchCount);
    if (newData.length === 0) return;
    setData(data.concat(newData));
    setPageNum(pageNum + 1);
  };

  const handleCatClick = (catID: number) => {
    navigateTo({
      url: `${config.app.catDetailPath}?catID=${catID}`,
    });
  };

  const renderItem = (item: CatList, _index: number, _pageIndex: number) => {
    return (
      <CardXL
        title={item.name}
        desc={item.description}
        src={`${fileUrl}/${item.coverPhoto?.fileName}`}
        className={"mb-3"}
        onClick={() => handleCatClick(item.id)}
      />
    );
  };

  return (
    <TopbarProvider title={"图鉴"} observeTargetSelector={".zt-main-list"}>
      <VirtialList
        className={"mx-auto container"}
        list={data}
        pageNum={pageNum}
        listType={"multi"}
        segmentNum={batchCount}
        autoScrollTop
        screenNum={2}
        scrollViewProps={{
          style: {
            height: "100vh",
            width: "93vw",
          },
          lowerThreshold: 30,
          enhanced: true,
          showScrollbar: false,
          onScrollToLower: handleScrollToLower,
        }}
        onRender={renderItem}
        onRenderTop={topElement}
        onRenderBottom={bottomElement}
      />
    </TopbarProvider>
  );
}
