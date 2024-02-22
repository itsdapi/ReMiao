import { config } from "@/lib/config";
import { getCatList } from "@/lib/miao-api/cat";
import { CatList } from "@/lib/miao-api/type";
import { RootState } from "@/lib/redux/store";
// import { getLocalFileUrl } from "@/lib/util";
import { CardXL } from "@/ui/cards";
import { IndexLayout } from "@/ui/layout";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Index() {
  const [data, setData] = useState<CatList[] | null>(null);
  const fileUrl = useSelector((state: RootState) => state.login.data?.fileUrl);
  useEffect(() => {
    const fetchData = async () => {
      setData(await getCatList());
    };
    fetchData();
  }, []);

  return (
    <IndexLayout title={config.app.title} className={"space-y-3"}>
      {data &&
        data?.map((item) => (
          <CardXL
            title={item.name}
            desc={item.description}
            src={`${fileUrl}/${item.coverPhoto?.fileName}`}
            key={item.id}
          />
        ))}
    </IndexLayout>
  );
}
