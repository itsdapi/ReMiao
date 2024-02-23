import { config } from "@/lib/config";
import { getStatusBarHeight, initIntersectObserver } from "@/lib/util";
import Title from "@/ui/title";
import { useEffect, useState } from "react";
import { TaroVirtualList } from "taro-virtual-list";

export function IndexLayout({
  fetchFn,
  renderItem,
  title,
  topTitle,
  batchCount = 10,
}: {
  fetchFn: (limit?: number, offset?: number) => Promise<any[]>;
  renderItem: (
    item: any,
    index: number,
    pageIndex: number
  ) => React.JSX.Element;
  topTitle: string;
  batchCount?: number;
  title?: string;
}) {
  const [statusBarHeight, setStatusBarHeight] = useState<number>(0);
  const [blockBarShow, setBlockBarShow] = useState<boolean>(false);
  const [pageNum, setPageNum] = useState(1);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const getSafeHeight = async () => {
      setStatusBarHeight((await getStatusBarHeight()) + 13);
    };

    const initData = async () => {
      setData(await fetchFn(batchCount, 0));
    };
    getSafeHeight();
    initData();
    initIntersectObserver(this, "#top", ".zt-main-list", setBlockBarShow);
  }, []);

  const topElement = () => {
    return (
      <>
        <div style={{ height: statusBarHeight + 10 }} className={"w-full"} />
        {title && <Title>{title}</Title>}
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
    const newData = await fetchFn(batchCount, pageNum * batchCount);
    if (newData.length === 0) return;
    setData(data.concat(newData));
    setPageNum(pageNum + 1);
  };

  return (
    <>
      <div
        id={"top"}
        style={{ height: statusBarHeight }}
        className={`w-full top-0 fixed z-40
        transition-fadeGlass duration-500
        ${blockBarShow ? "white-glass" : "bg-white"}}`}
      >
        <h1
          className={`absolute bottom-3 inset-x-0 text-center transition-opacity duration-200 font-medium ${
            blockBarShow ? "opacity-100" : "opacity-0"
          }`}
        >
          {topTitle}
        </h1>
      </div>
      <TaroVirtualList
        className={"mx-auto container"}
        list={data}
        pageNum={pageNum}
        listType={"multi"}
        segmentNum={batchCount}
        autoScrollTop={true}
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
    </>
  );
}

export function CenterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={"h-screen w-screen flex items-center justify-center"}>
      <div className={"p-5 border-2 rounded-xl w-screen"}>
        <div className={"mx-3 space-y-3"}>{children}</div>
      </div>
    </div>
  );
}
