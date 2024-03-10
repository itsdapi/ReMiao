import Image from "@/ui/image";
import CatHelp from "@/public/icon/cat_help.svg";
import Close from "@/public/icon/close.svg";
import { Image as TaroImage, Text } from "@tarojs/components";
import { Dispatch, SetStateAction } from "react";
import { userReadNotification } from "@/lib/util";
import { config } from "@/lib/config";
import Avatar from "@/ui/avatar";
import Tag from "@/ui/tag";

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
  id,
  isShow,
  setShowFn,
}: {
  text: string;
  title: string;
  id: number;
  isShow: boolean;
  setShowFn?: Dispatch<SetStateAction<boolean>>;
}) {
  const handleClose = () => {
    if (!setShowFn) return;
    setShowFn(false);
    userReadNotification(id);
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

interface PortraitCardProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  src: string;
  ariaLabel: string;
}
export function PortraitCard(props: PortraitCardProps) {
  return (
    <div {...props}>
      <Image
        ariaLabel={props.ariaLabel}
        src={props.src}
        className={"rounded-2xl w-56 h-[19rem] shadow-bb"}
      />
    </div>
  );
}

interface ACProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  title: string;
  desc: string;
  src: string;
}
export function ArticleCard(props: ACProps) {
  return (
    <div {...props}>
      <div
        className={
          "rounded-2xl w-full h-40 flex flex-row flex-nowrap bg-white box-border"
        }
        style={{ border: `solid 1px ${config.app.colors.secondary["800"]}` }}
      >
        <Image
          ariaLabel={`文章${props.title}封面`}
          src={props.src}
          className={"h-full w-4/12 rounded-l-2xl shrink-0"}
        />
        <div className={"space-y-2 p-5 text-secondary-900"}>
          <h1 className={"font-bold text-2xl line-clamp-2"}>{props.title}</h1>
          <p className={"text-sm line-clamp-3"}>{props.desc}</p>
        </div>
      </div>
    </div>
  );
}

export function ContactCard({
  name,
  email,
  wx,
  avatar,
  tag,
}: {
  name: string;
  email?: string;
  wx: string;
  avatar: string;
  tag: string;
}) {
  const Info = ({ title, value }: { title: string; value: string }) => {
    return (
      <p className={"flex flex-col justify-center items-center"}>
        <div className={"text-sm font-bold"}>{title}</div>
        <Text className={"font-light w-fit"} selectable userSelect>
          {value}
        </Text>
      </p>
    );
  };
  return (
    <div
      className={
        "bg-white flex flex-col items-center justify-center text-secondary-900 rounded-2xl p-5 shadow-bb gap-3"
      }
    >
      <Avatar src={avatar} className={"h-20 w-20"} />
      <h1 className={"text-2xl font-light"}>{name}</h1>
      <Tag disable text={tag} />
      <Info title={"微信"} value={wx} />
      {email && <Info title={"邮箱"} value={email} />}
    </div>
  );
}
