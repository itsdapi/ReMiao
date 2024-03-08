import { useEffect, useState } from "react";
import {
  getEnvMode,
  getStatusBarHeight,
  initIntersectObserver,
} from "@/lib/util";
import { TopHeightReturnType } from "@/lib/type";
import { Back } from "@/ui/button/button";
import Loading from "@/ui/loading";

interface TopbarProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  title?: string;
  observeTargetSelector?: string;
  back?: boolean;
  heightOffset?: number;
  defaultHidden?: boolean;
  topClassName?: string;
  loading?: boolean;
}

export default function TopbarProvider(props: TopbarProps) {
  const [blockBarShow, setBlockBarShow] = useState<boolean>(false);
  const isPreview = getEnvMode() === "development";
  // const isPreview = false;
  const [height, setHeight] = useState<TopHeightReturnType>({
    full: 0,
    menu: 0,
    statusbar: 0,
  });

  useEffect(() => {
    const getSafeHeight = async () => {
      let result = await getStatusBarHeight();
      result.full += props.heightOffset ? props.heightOffset : 0;
      setHeight(result);
      // console.log("topbar", result);
    };
    getSafeHeight();
    props.observeTargetSelector &&
      initIntersectObserver(
        this,
        "#top",
        props.observeTargetSelector,
        setBlockBarShow
      );
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div
        id={"top"}
        style={{ height: height.full }}
        className={`w-full top-0 fixed z-40
        transition-fadeGlass duration-500
        ${props.topClassName}
        ${props.defaultHidden ? "opacity-0" : "opacity-100"}
        ${
          blockBarShow
            ? "white-glass opacity-100"
            : props.topClassName
            ? props.topClassName
            : "bg-white"
        }`}
      >
        <div
          className={"absolute w-full"}
          style={{ top: `${height.menu + 11}px` }}
        >
          {props.back && <Back />}
          <h1
            className={`w-fit mx-auto absolute bottom-0 inset-x-0 text-center
            transition-opacity duration-200 font-light flex justify-start gap-2
            ${blockBarShow ? "opacity-100" : "opacity-0"}
            ${isPreview ? "bg-red-300 px-4 py-1 rounded-full" : ""}
            `}
          >
            <div style={{ height: 20, width: 20 }} />
            {props.title}
            <Loading
              loading={props.loading ? props.loading : false}
              size={20}
            />
          </h1>
        </div>
      </div>
      <div {...props} />
    </>
  );
}
