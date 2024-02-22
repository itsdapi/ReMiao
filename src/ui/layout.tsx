import { config } from "@/lib/config";
import { getStatusBarHeight, initIntersectObserver } from "@/lib/util";
import Title from "@/ui/title";
import { ScrollView } from "@tarojs/components";
import { useEffect, useState } from "react";

export function IndexLayout({
  children,
  title,
  className,
}: {
  children: React.ReactNode;
  title?: string;
  className?: string;
}) {
  const [statusBarHeight, setStatusBarHeight] = useState<number>(0);
  const [blockBarShow, setBlockBarShow] = useState<boolean>(false);
  useEffect(() => {
    const getSafeHeight = async () => {
      setStatusBarHeight((await getStatusBarHeight()) + 10);
    };
    getSafeHeight();
    initIntersectObserver(this, "#top", "#content", setBlockBarShow);
  }, []);

  return (
    <ScrollView scrollY className={"h-screen"}>
      <div
        id={"top"}
        style={{ height: statusBarHeight }}
        className={`w-full top-0 fixed z-40 ${
          blockBarShow ? "bg-red-500" : "bg-green-500"
        }}`}
      ></div>
      <div style={{ height: statusBarHeight + 10 }} className={"w-full"} />
      <div className={"container mx-auto"} id={"content"}>
        <div className={"mx-3"}>
          {title && <Title>{title}</Title>}
          <div className={`${className}`}>{children}</div>
        </div>
      </div>
      <div
        style={{ height: `${config.app.tabbarHeight + 2}rem` }}
        className={"w-full"}
      />
    </ScrollView>
  );
}

export function CenterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={"h-screen w-screen flex items-center justify-center"}>
      <div className={"p-5 border-2 rounded-xl w-screen"}>
        <div className={"mx-3 space-y-3"}>{children}</div>
      </div>
    </div>
  );
}
