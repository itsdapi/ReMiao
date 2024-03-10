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
import { PaddingBottom, PaddingBlock } from "@/ui/padding-block";
import { isShowNotification } from "@/lib/util";
import { useFetchInfinite } from "@/lib/hook";
import MySuspense from "@/ui/my-suspense";
import { IndexSkeleton } from "@/ui/skeleton";

// 指定一次获取列表多少项
const batchCount = 10;
const getKey = (pageNum: number) => {
  return { limit: batchCount, offset: pageNum * batchCount };
};

export default function Index() {
  const fileUrl = useSelector((state: RootState) => state.login.data?.fileUrl);
  const [NotifShow, setNotifShow] = useState(true);
  const { data, pageNum, nextPage, loading, initLoading } = useFetchInfinite(
    getKey,
    getCatList
  );

  useEffect(() => {
    const notificationShouldPop = async () => {
      setNotifShow(await isShowNotification(notification.id));
    };

    notificationShouldPop();
    // eslint-disable-next-line
  }, []);

  const notification = {
    text: "早上好",
    title: "公告",
    id: 1,
  };

  const tags: Tag[] = [
    { id: "0", name: "大橘" },
    { id: "1", name: "虎纹" },
    { id: "2", name: "温顺" },
    { id: "3", name: "大吃" },
    { id: "4", name: "凶人" },
    { id: "5", name: "怕人" },
    { id: "6", name: "奶牛" },
  ];

  const topElement = () => {
    return (
      <>
        <div className={"space-y-3 mb-3"}>
          <Notification
            setShowFn={setNotifShow}
            isShow={NotifShow}
            id={notification.id}
            title={notification.title}
            text={notification.text}
          />
          <Title>{config.app.title}</Title>
          <TagSelector tags={tags} />
          <MySuspense loading={initLoading} fallback={<IndexSkeleton />} />
        </div>
      </>
    );
  };

  const topTopElement = () => {
    return <PaddingBlock />;
  };

  const bottomElement = () => {
    return <PaddingBottom />;
  };

  const handleScrollToLower = async () => {
    // console.log(`trigger load data pageNum: ${pageNum}`);
    nextPage();
  };

  const handleCatClick = (id: number) => {
    navigateTo({
      url: `${config.app.catDetailPath}?id=${id}`,
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
    <TopbarProvider
      title={"图鉴"}
      observeTargetSelector={"#content"}
      topClassName={"bg-primary-100"}
      className={"bg-primary-100"}
      loading={loading}
    >
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
        onRenderTopTop={topTopElement}
        onRenderBottom={bottomElement}
      />
    </TopbarProvider>
  );
}
