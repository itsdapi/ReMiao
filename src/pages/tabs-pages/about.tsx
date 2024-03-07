import { useEffect } from "react";
import TopbarProvider from "@/ui/topbar";
import { PaddingBlock, PaddingBottom } from "@/ui/padding-block";
import OrgInfo from "@/ui/components/org-info";
import User from "@/ui/components/user";

export default function About() {
  useEffect(() => {}, []);
  return (
    <TopbarProvider
      topClassName={"bg-primary-100"}
      className={"bg-primary-100 min-h-screen"}
      observeTargetSelector={"#content"}
      title={"关于"}
    >
      <div className={"mx-5"}>
        <PaddingBlock />
        <div id={"content"} className={"space-y-3"}>
          <OrgInfo />
          <User />
        </div>
      </div>
      <PaddingBottom />
    </TopbarProvider>
  );
}
