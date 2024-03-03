import {useEffect, useState} from "react";
import {initIntersectObserver} from "@/lib/util";

export default function TopbarProvider(
  {children,observeTargetSelector, height, title, }: { children: React.ReactNode, title?: string, observeTargetSelector: string, height: number }
) {
  const [blockBarShow, setBlockBarShow] = useState<boolean>(false);

  useEffect(() => {
    initIntersectObserver(this, "#top", observeTargetSelector, setBlockBarShow);
  }, []);

  return <>
    <div
      id={"top"}
      style={{height: height}}
      className={`w-full top-0 fixed z-40
        transition-fadeGlass duration-500
        ${blockBarShow ? "white-glass" : "bg-white"}}`}
    >
      <h1
        className={`absolute bottom-3 inset-x-0 text-center transition-opacity duration-200 font-medium ${
          blockBarShow ? "opacity-100" : "opacity-0"
        }`}
      >
        {title}
      </h1>
    </div>
    {children}
  </>
}
