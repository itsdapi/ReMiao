import { useEffect } from "react";
import TopbarProvider from "@/ui/topbar";
import { PaddingTop } from "@/ui/padding-top";

export default function About() {
  useEffect(() => {}, []);
  return (
    <TopbarProvider>
      <PaddingTop />
      <div>about page</div>
    </TopbarProvider>
  );
}
