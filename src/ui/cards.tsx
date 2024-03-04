import Image from "@/ui/image";
import CatHelp from "@/public/icon/cat_help.svg";
import Close from "@/public/icon/close.svg";
import { Image as TaroImage } from "@tarojs/components";
import { Dispatch, SetStateAction } from "react";

interface CardXLProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  title?: string;
  src?: string;
  desc?: string;
}

export function CardXL(props: CardXLProps) {
  return (
    <div className={`${props.className} rounded-2xl`} {...props}>
      <Image
        src={props.src}
        ariaLabel={props.title ? props.title : "空图片"}
        className={"h-40 w-full rounded-2xl relative"}
        mode={"aspectFill"}
      >
        <div
          className={
            "text-white inset-x-0 glass absolute bottom-0 flex flex-row py-2 px-5 justify-between items-center space-x-3"
          }
        >
          <h2 className={"font-medium shrink-0"}>{props.title}</h2>
          <h3 className={"font-light text-sm truncate"}>{props.desc}</h3>
        </div>
      </Image>
    </div>
  );
}

export function Notification({
  text,
  title,
  isShow,
  setShowFn,
}: {
  text: string;
  title: string;
  isShow: boolean;
  setShowFn?: Dispatch<SetStateAction<boolean>>;
}) {
  const handleClose = () => {
    if (!setShowFn) return;
    setShowFn(false);
  };
  return (
    <div
      className={`bg-primary-900/20 px-6 py-3 rounded-2xl relative ${
        isShow ? "block" : "hidden"
      }`}
    >
      <TaroImage
        src={Close}
        className={"h-4 w-4 absolute top-3 right-3"}
        onClick={handleClose}
      />
      <p className={"flex flex-row items-end pb-1"}>
        <TaroImage src={CatHelp} className={"h-8 w-8"} />
        <h1 className={"font-bold"}>{title}</h1>
      </p>
      <p>{text}</p>
    </div>
  );
}
