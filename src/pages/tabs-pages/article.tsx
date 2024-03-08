import TopbarProvider from "@/ui/topbar";
import { PaddingBlock, PaddingBottom } from "@/ui/padding-block";
import { useFetchInfinite } from "@/lib/hook";
import VirtialList from "@/ui/virtual-list";
import { ArticleList } from "@/lib/miao-api/type";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { ArticleCard } from "@/ui/cards";
import { navigateTo } from "@tarojs/taro";
import { config } from "@/lib/config";
import { getArticleList } from "@/lib/miao-api/article";
import Title from "@/ui/title";

// 指定一次获取列表多少项
const batchCount = 10;
const getKey = (pageNum: number) => {
  return { limit: batchCount, offset: pageNum * batchCount };
};

export default function Article() {
  const fileUrl = useSelector((state: RootState) => state.login.data?.fileUrl);
  const { data, pageNum, nextPage, loading } = useFetchInfinite(
    getKey,
    getArticleList
  );

  const handleScrollToLower = async () => {
    // console.log(`trigger load data pageNum: ${pageNum}`);
    nextPage();
  };

  const handleArticleClick = async (url: string) => {
    navigateTo({ url: `${config.app.articleDetailPath}?url=${url}` });
  };

  const bottomElement = () => {
    return <PaddingBottom />;
  };

  const topTopElement = () => {
    return <PaddingBlock />;
  };

  const topElement = () => {
    return <Title className={"mb-3"}>文章</Title>;
  };

  const renderItem = (
    item: ArticleList,
    _index: number,
    _pageIndex: number
  ) => {
    return (
      <ArticleCard
        title={item.title}
        desc={item.summary}
        className={"mb-3"}
        src={`${fileUrl}/${item.coverPhoto.fileName}`}
        onClick={() => handleArticleClick(item.url)}
      />
    );
  };

  return (
    <TopbarProvider
      title={"文章"}
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
        onRenderTopTop={topTopElement}
        onRenderTop={topElement}
        onRenderBottom={bottomElement}
      />
    </TopbarProvider>
  );
}
