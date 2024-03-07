import TopbarProvider from "@/ui/topbar";
import { PaddingBlock, PaddingBottomS } from "@/ui/padding-block";
import { getCatDetail } from "@/lib/miao-api/cat";
import { useShareAppMessage, ShareAppMessageReturn } from "@tarojs/taro";
import { config } from "@/lib/config";
import PortraitScrollList from "@/ui/components/portrait-scroll-list";
import { CatStatus } from "@/lib/miao-api/enum";
import { KVInfo } from "@/ui/info";
import { RoundBtn } from "@/ui/button/button";
import Tag from "@/ui/tag";
import { useFetch, useParams } from "@/lib/hook";

definePageConfig({
  navigationBarTitleText: "猫咪",
  enableShareAppMessage: true,
  enableShareTimeline: true,
});

export default function CatDetail(param: any) {
  const params = useParams(param, ["id"]);
  const { data } = useFetch(getCatDetail, params.id);

  useShareAppMessage((): ShareAppMessageReturn => {
    return {
      title: data?.info.name,
      path: `${config.app.catDetailPath}?id=${params?.id}`,
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
      <PortraitScrollList
        photos={data?.selectedPhotos.concat(data?.coverPhoto)}
      />
      <div
        className={
          "flex flex-col justify-center items-center mt-5 mx-10 space-y-5"
        }
      >
        <h1 className={"text-2xl font-thin"}>{data?.info.name}</h1>
        <div
          className={
            "flex flex-col flex-wrap justify-between align-middle gap-5 w-full"
          }
        >
          {/*这样布局让前3个KV单独一列 然后让容易比较长的单独一列*/}
          <div className={"flex flex-row flex-wrap gap-5 justify-between"}>
            <KVInfo title={"毛色"} value={data?.info.species} />
            <KVInfo
              title={"状态"}
              value={CatStatus[data?.info.status ? data.info.status : 6]}
            />
            <KVInfo
              title={"是否绝育"}
              value={data?.info.isNeuter ? "是" : "否"}
            />
          </div>
          <KVInfo title={"外貌描述"} value={data?.info.description} />
          <KVInfo title={"出没地点"} value={data?.info.haunt} />
        </div>
        <div className={"w-full flex flex-row flex-wrap gap-3"}>
          {data?.tags.map((tag) => (
            <Tag text={`#${tag.name}`} key={tag.id} />
          ))}
        </div>
        <RoundBtn className={"mt-5"}>反馈猫咪信息</RoundBtn>
        <PaddingBottomS />
      </div>
    </TopbarProvider>
  );
}
