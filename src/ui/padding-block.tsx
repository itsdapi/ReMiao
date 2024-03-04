import { useEffect, useState } from "react";
import { getStatusBarHeight } from "@/lib/util";

export default function PaddingBlock() {
  const [statusBarHeight, setStatusBarHeight] = useState<number>(0);
  useEffect(() => {
    const getSafeHeight = async () => {
      setStatusBarHeight((await getStatusBarHeight()).full);
    };

    getSafeHeight();
  }, []);
  return <div style={{ height: statusBarHeight + 10 }} className={"w-full"} />;
}
