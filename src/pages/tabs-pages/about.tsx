import { useEffect } from "react";
import TopbarProvider from "@/ui/topbar";
import PaddingBlock from "@/ui/padding-block";

export default function About() {
  useEffect(() => {}, []);
  return (
    <TopbarProvider>
      <PaddingBlock />
      <div>about page</div>
    </TopbarProvider>
  );
}
