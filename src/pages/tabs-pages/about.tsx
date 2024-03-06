import { useEffect } from "react";
import TopbarProvider from "@/ui/topbar";
import { PaddingBlock } from "@/ui/padding-block";

export default function About() {
  useEffect(() => {}, []);
  return (
    <TopbarProvider
      topClassName={"bg-primary-100"}
      className={"bg-primary-100"}
    >
      <PaddingBlock />
      <div>about page</div>
    </TopbarProvider>
  );
}
