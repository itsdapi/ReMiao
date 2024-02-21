import { config } from "@/lib/config";
import { actionFetchCatList } from "@/lib/redux/cat-list-slice";
import { AppDispatch, RootState } from "@/lib/redux/store";
// import { getLocalFileUrl } from "@/lib/util";
import { CardXL } from "@/ui/cards";
import { IndexLayout } from "@/ui/layout";
import Title from "@/ui/title";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Index() {
  const { data } = useSelector((state: RootState) => state.catList);
  const fileUrl = useSelector((state: RootState) => state.login.data?.fileUrl);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    // console.log("catList", data);
    if (data) return;
    dispatch(actionFetchCatList());
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
