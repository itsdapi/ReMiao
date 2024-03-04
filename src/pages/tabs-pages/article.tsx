import { useEffect } from "react";
import TopbarProvider from "@/ui/topbar";
import PaddingBlock from "@/ui/padding-block";

export default function Article() {
  useEffect(() => {}, []);
  return (
    <TopbarProvider observeTargetSelector={""}>
      <PaddingBlock />
      <div>article page</div>
    </TopbarProvider>
  );
}
