import { useEffect, useState } from "react";
import { getStatusBarHeight, initIntersectObserver } from "@/lib/util";
import SvgIcon from "@/ui/svg-icon";
import BackIcon from "@/public/icon/back.svg";
import { navigateBack } from "@tarojs/taro";
import { TopHeightReturnType } from "@/lib/type";

export default function TopbarProvider({
  children,
  observeTargetSelector,
  title,
  back,
}: {
  children: React.ReactNode;
  title?: string;
  observeTargetSelector?: string;
  back?: boolean;
}) {
  const [blockBarShow, setBlockBarShow] = useState<boolean>(false);
  const [height, setHeight] = useState<TopHeightReturnType>({
    full: 0,
    menu: 0,
    statusbar: 0,
  });

  useEffect(() => {
    const getSafeHeight = async () => {
      const result = await getStatusBarHeight();
      setHeight(result);
      // console.log("topbar", result);
    };

    getSafeHeight();
    observeTargetSelector &&
      initIntersectObserver(
        this,
        "#top",
        observeTargetSelector,
        setBlockBarShow
      );
  }, []);

  const handleBackClick = () => {
    navigateBack({ delta: 1 });
  };

  return (
    <>
      <div
        id={"top"}
        style={{ height: height.full }}
        className={`w-full top-0 fixed z-40
        transition-fadeGlass duration-500
        ${blockBarShow ? "white-glass" : "bg-white"}}`}
      >
        <div
          className={"absolute w-full"}
          style={{ top: `${height.menu + 11}px` }}
        >
          <SvgIcon
            src={BackIcon}
            size={18}
            color={"black"}
            className={`absolute bottom-0 left-4 ${back ? "block" : "hidden"}`}
            onClick={handleBackClick}
          />
          <h1
            className={`w-fit mx-auto absolute bottom-0 inset-x-0 text-center transition-opacity duration-200 font-medium ${
              blockBarShow ? "opacity-100" : "opacity-0"
            }`}
          >
            {title}
          </h1>
        </div>
      </div>
      {children}
    </>
  );
}
