import { useEffect } from "react";
import TopbarProvider from "@/ui/topbar";
import { PaddingTop } from "@/ui/padding-top";

export default function Article() {
  useEffect(() => {}, []);
  return (
    <TopbarProvider observeTargetSelector={""}>
      <PaddingTop />
      <div>article page</div>
    </TopbarProvider>
  );
}
