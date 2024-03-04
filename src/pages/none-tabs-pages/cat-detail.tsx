import { useEffect, useState } from "react";
import TopbarProvider from "@/ui/topbar";
import { getCurrentInstance } from "@tarojs/runtime";
import PaddingBlock from "@/ui/padding-block";

interface CatDetailProps {
  catID: number;
}

export default function CatDetail() {
  const [catID, setCatID] = useState<number>();
  useEffect(() => {
    const params = getCurrentInstance().router?.params as
      | CatDetailProps
      | undefined;
    setCatID(params?.catID);
  }, []);

  return (
    <TopbarProvider
      observeTargetSelector={"content"}
      title={catID?.toString()}
      back
    >
      <div>
        <PaddingBlock />
        catid {catID}
      </div>
    </TopbarProvider>
  );
}
