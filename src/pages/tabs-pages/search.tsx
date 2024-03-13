import TopbarProvider from "@/ui/topbar";
import { PaddingBottom, PaddingBlock } from "@/ui/padding-block";
import { useDebouncedCallback } from "use-debounce";
import SearchInput from "@/ui/search-input";
import Title from "@/ui/title";
import { searchCat } from "@/lib/miao-api/cat";
import emptyIcon from "@/public/icon/empty.svg";
import { useState } from "react";
import { CatList, SearchResult } from "@/lib/miao-api/type";
import { isBlank } from "@/lib/util";
import { CardXL } from "@/ui/cards";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import VirtialList from "@/ui/virtual-list";
import { navigateTo } from "@tarojs/taro";
import { config } from "@/lib/config";
import SvgIcon from "@/ui/svg-icon";

// TODO: 修复在已有前搜索结果的情况下 再搜索结果为空时 不会清空屏幕上上次的搜索结果

export default function Search() {
  const [data, setData] = useState<SearchResult[]>([]);
  const [query, setQuery] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const batchCount = 20;
  const fileUrl = useSelector((state: RootState) => state.login.data?.fileUrl);

  const handleSearch = useDebouncedCallback((term: string) => {
    const search = async (q: string) => {
      if (isBlank(q)) {
        setIsEmpty(false);
        return;
      }
      console.log(`searching ${q}`);
      const result = await searchCat(q);
      setIsEmpty(result.length === 0);
      setData(result);
      setQuery(q);
    };

    search(term);
  }, 300);

  const topElement = () => {
    return (
      <>
        <Title className={"mb-3"}>搜索</Title>
        <SearchInput
          className={"mb-3"}
          placeholder={"猫猫名字、描述、标签和其他内容"}
          onInput={(e) => handleSearch(e.detail.value)}
        />
      </>
    );
  };

  const renderItem = (item: CatList, _index: number, _pageIndex: number) => {
    return (
      <CardXL
        key={item.id}
        title={item.name}
        desc={item.description}
        src={`${fileUrl}/${item.coverPhoto?.fileName}`}
        className={"mb-3"}
        onClick={() => handleCatClick(item.id)}
      />
    );
  };

  const topTopElement = () => {
    return <PaddingBlock />;
  };

  const bottomElement = () => {
    return isEmpty ? (
      <div className={"flex flex-col items-center justify-center space-y-2"}>
        <SvgIcon
          src={emptyIcon}
          color={"#a4a4a4"}
          size={60}
          className={"m-auto w-fit"}
        />
        <p className={"text-sm text-[#a4a4a4]"}>找不到猫猫:(</p>
      </div>
    ) : (
      <PaddingBottom />
    );
  };

  const handleScrollToLower = async () => {
    // console.log(`trigger load data pageNum: ${pageNum}`);
    const newData = await searchCat(query, batchCount, pageNum * batchCount);
    if (newData.length === 0) return;
    setData(data.concat(newData));
    setPageNum(pageNum + 1);
  };

  const handleCatClick = (id: number) => {
    navigateTo({
      url: `${config.app.catDetailPath}?id=${id}`,
    });
  };

  return (
    <TopbarProvider
      observeTargetSelector={"#content"}
      title={"搜索"}
      topClassName={"bg-primary-100"}
      className={"bg-primary-100"}
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
          enableBackToTop: true,
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
