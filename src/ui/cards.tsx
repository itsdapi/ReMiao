import Image from "@/ui/image";
import SvgIcon from "@/ui/svg-icon";
import CatHelp from "@/public/icon/cat_help.svg"

export function CardXL({
                         title,
                         src,
                         desc,
                         className,
                       }: {
  title?: string;
  src?: string;
  desc?: string;
  className?: string;
}) {
  return (
    <div className={`${className} rounded-2xl`}>
      <Image
        src={src}
        ariaLabel={title ? title : "空图片"}
        className={"h-40 w-full rounded-2xl relative"}
        mode={"aspectFill"}
      >
        <div className={'text-white inset-x-0 glass absolute bottom-0 flex flex-row py-2 px-5 justify-between items-center space-x-3'}>
          <h2 className={"font-medium shrink-0"}>{title}</h2>
          <h3 className={"font-light text-sm truncate"}>{desc}</h3>
        </div>
      </Image>

    </div>
  );
}

export function Notification() {
  return <div className={'bg-gray-300/50 p-10 rounded-2xl'}>
    <p>
      <SvgIcon src={CatHelp} size={20} color={'black'}/>
      <h1>通知</h1>
    </p>
    <p>
      1231234123124haohaohao
    </p>
  </div>
}
