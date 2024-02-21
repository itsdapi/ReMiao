import { config } from "@/lib/config";
import { getStatusBarHeight } from "@/lib/util";
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
  useEffect(() => {
    const getSafeHeight = async () => {
      setStatusBarHeight(await getStatusBarHeight());
    };
    getSafeHeight();
  }, []);

  return (
    <ScrollView scrollY className={"h-screen"}>
      <div style={{ height: statusBarHeight + 10 }} className={"w-full"} />
      <div className={"container mx-auto"}>
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
