import { useLoad } from "@tarojs/taro";
import "taro-ui/dist/style/index.scss";
import NavBar from "@/ui/navbar";
import { useRoutes } from "react-router-dom";
import { routes } from "@/lib/route";
import { getStatusBarHeight } from "@/lib/util";
import { useState } from "react";

export default function Index() {
  const Element = useRoutes(routes);
  const [statusBarHeight, setStatusBarHeight] = useState<number>(0);
  useLoad(async () => {
    console.log("Page loaded.");
    setStatusBarHeight(await getStatusBarHeight());
  });
  return (
    <div style={{ paddingTop: statusBarHeight + 10 }}>
      <div className={"container mx-3"}>{Element}</div>
      <NavBar />
    </div>
  );
}

definePageConfig({
  navigationBarTitleText: "首页",
  renderer: "skyline",
});
