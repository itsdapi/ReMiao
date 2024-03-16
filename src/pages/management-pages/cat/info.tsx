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

  return (
    <TopbarProvider
      title={data?.info.name}
      back
      className={"bg-primary-100 min-h-screen"}
      topClassName={"bg-primary-100"}
    >
      <PaddingBlock />
      {/* TODO: Skeleton、catTags、catPhotos */}
      <MySuspense loading={isLoading} fallback={<CatDetailSkeleton />}>
        {data && <CatForm catInfo={data.info}></CatForm>}
      </MySuspense>
    </TopbarProvider>
  );
}
