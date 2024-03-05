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
  heightOffset,
  defaultHidden = false,
}: {
  children: React.ReactNode;
  title?: string;
  observeTargetSelector?: string;
  back?: boolean;
  heightOffset?: number;
  defaultHidden?: boolean;
}) {
  const [blockBarShow, setBlockBarShow] = useState<boolean>(false);
  const [height, setHeight] = useState<TopHeightReturnType>({
    full: 0,
    menu: 0,
    statusbar: 0,
  });

  useEffect(() => {
    const getSafeHeight = async () => {
      let result = await getStatusBarHeight();
      result.full += heightOffset ? heightOffset : 0;
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
      {/*<div*/}
      {/*  id={"top"}*/}
      {/*  className={"fixed w-full z-40"}*/}
      {/*  style={{ height: height.full }}*/}
      {/*/>*/}
      <div
        id={"top"}
        style={{ height: height.full }}
        className={`w-full top-0 fixed z-40
        transition-fadeGlass duration-500
        ${defaultHidden ? "opacity-0" : "opacity-100"}
        ${blockBarShow ? "white-glass opacity-100" : "bg-white"}`}
      >
        <div
          className={"absolute w-full"}
          style={{ top: `${height.menu + 11}px` }}
        >
          {back && (
            <SvgIcon
              src={BackIcon}
              size={18}
              color={"black"}
              className={`absolute bottom-0 left-4`}
              onClick={handleBackClick}
            />
          )}
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
