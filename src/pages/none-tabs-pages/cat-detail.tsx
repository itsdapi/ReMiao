import { useEffect, useState } from "react";
import TopbarProvider from "@/ui/topbar";
import { getCurrentInstance } from "@tarojs/runtime";
import { PaddingTop } from "@/ui/padding-top";
import { getCatDetail } from "@/lib/miao-api/cat";
import { CatDetail as CatDetailType } from "@/lib/miao-api/type";
import { useShareAppMessage, ShareAppMessageReturn } from "@tarojs/taro";
import { config } from "@/lib/config";

interface CatDetailProps {
  id: number;
}

definePageConfig({
  navigationBarTitleText: "猫咪",
  enableShareAppMessage: true,
  enableShareTimeline: true,
  enablePullDownRefresh: true,
});

export default function CatDetail() {
  const [data, setData] = useState<CatDetailType>();
  const [params, setParams] = useState<CatDetailProps>();
  useEffect(() => {
    const _params = getCurrentInstance().router?.params as
      | CatDetailProps
      | undefined;
    const initData = async () => {
      if (!_params) {
        throw new Error("Cat Detail page params undefined!");
      }
      setData(await getCatDetail(_params.id));
      setParams(_params);
    };

    initData();
  }, []);

  useShareAppMessage((): ShareAppMessageReturn => {
    return {
      title: data?.info.name,
      path: `${config.app.catDetailPath}?id=${params?.id}`,
    };
  });

  return (
    <TopbarProvider title={data?.info.name} back>
      <div>
        <PaddingTop />
        name: {data?.info.name}
        {data &&
          Object.keys(data.info).map((key) => (
            <div key={data.info.name}>
              key: {key}, value: {data.info[key]}
            </div>
          ))}
      </div>
    </TopbarProvider>
  );
}
