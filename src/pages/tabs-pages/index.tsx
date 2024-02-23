import { config } from "@/lib/config";
import { getCatList } from "@/lib/miao-api/cat";
import { CatList } from "@/lib/miao-api/type";
import { RootState } from "@/lib/redux/store";
import { CardXL } from "@/ui/cards";
import { IndexLayout } from "@/ui/layout";
import { useSelector } from "react-redux";

export default function Index() {
  const fileUrl = useSelector((state: RootState) => state.login.data?.fileUrl);

  const renderItem = (item: CatList, index: number, pageIndex: number) => {
    return (
      <CardXL
        title={item.name}
        desc={item.description}
        src={`${fileUrl}/${item.coverPhoto?.fileName}`}
        className={"mb-3"}
      />
    );
  };

  return (
    <IndexLayout
      renderItem={renderItem}
      fetchFn={getCatList}
      topTitle={"首页"}
      title={config.app.title}
      batchCount={20}
    />
  );
}
