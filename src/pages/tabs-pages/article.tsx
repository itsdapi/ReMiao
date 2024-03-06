import { useEffect } from "react";
import TopbarProvider from "@/ui/topbar";
import { PaddingBlock } from "@/ui/padding-block";

export default function Article() {
  useEffect(() => {}, []);
  return (
    <TopbarProvider
      observeTargetSelector={""}
      topClassName={"bg-primary-100"}
      className={"bg-primary-100"}
    >
      <PaddingBlock />
      <div>article page</div>
    </TopbarProvider>
  );
}
