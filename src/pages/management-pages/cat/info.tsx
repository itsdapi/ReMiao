import TopbarProvider from "@/ui/topbar";
import { PaddingBlock } from "@/ui/padding-block";
import { getCatDetail } from "@/lib/miao-api/cat";
import { useShareAppMessage, ShareAppMessageReturn } from "@tarojs/taro";
import { config } from "@/lib/config";
// import { CatStatus } from "@/lib/miao-api/enum";
import { useParams } from "@/lib/hook";
import useSWR from "swr";
import MySuspense from "@/ui/my-suspense";
import { CatDetailSkeleton } from "@/ui/skeleton";
import { CatForm } from "@/ui/manager/cat-form";
import { useState } from "react";
import { Tabs } from "@nutui/nutui-react-taro";
import CatImage from "@/ui/manager/image";

definePageConfig({
  navigationBarTitleText: "猫咪",
  enableShareAppMessage: true,
  enableShareTimeline: true,
});

export default function CatDetail(param: any) {
  const { id } = useParams(param, ["id"]);
  // const { data } = useFetch(getCatDetail, params.id);
  const { data, isLoading } = useSWR(id, (_id) => getCatDetail(_id));

  useShareAppMessage((): ShareAppMessageReturn => {
    return {
      title: data?.info.name,
      path: `${config.app.catDetailPath}?id=${id}`,
    };
  });
  console.log(data);
  const [tabIndex, setTabIndex] = useState<string | number>(0);
  return (
    <TopbarProvider
      title={data?.info.name}
      back
      className={"bg-primary-100 min-h-screen"}
      topClassName={"bg-primary-100"}
    >
      <PaddingBlock />
      <Tabs
        value={tabIndex}
        onChange={(value) => {
          setTabIndex(value);
        }}
        activeType={"smile"}
      >
        <Tabs.TabPane title={"信息编辑"}>
          <MySuspense loading={isLoading} fallback={<CatDetailSkeleton />}>
            {id && data && <CatForm id={id} catInfo={data.info}></CatForm>}
          </MySuspense>
        </Tabs.TabPane>
        <Tabs.TabPane title={"图片管理"}>
          {data?.selectedPhotos && (
            <CatImage photos={data?.selectedPhotos}></CatImage>
          )}
        </Tabs.TabPane>
        <Tabs.TabPane title={"Tag管理"}> Tab 3 </Tabs.TabPane>
      </Tabs>
      {/* TODO: Skeleton、catTags、catPhotos */}
    </TopbarProvider>
  );
}
