import { useEffect, useState } from "react";
import { getStatusBarHeight } from "@/lib/util";
import { config } from "@/lib/config";

export function PaddingBlock() {
  const [statusBarHeight, setStatusBarHeight] = useState<number>(0);
  useEffect(() => {
    const getSafeHeight = async () => {
      setStatusBarHeight((await getStatusBarHeight()).full);
    };

    getSafeHeight();
  }, []);
  return <div style={{ height: statusBarHeight + 10 }} className={"w-full"} />;
}

export function PaddingBottom() {
  return (
    <div
      style={{ height: `${config.app.tabbarHeight + 2}rem` }}
      className={"w-full"}
    />
  );
}

export function PaddingBottomS() {
  return <div className={"w-full h-5"} />;
}
