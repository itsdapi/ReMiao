import SvgIcon from "@/ui/svg-icon";
import ImageIcon from "@/public/icon/add-image.svg";
import SendIcon from "@/public/icon/send.svg";
import { config } from "@/lib/config";
import { chooseMedia } from "@/lib/util";
import { ChooseMedia } from "@/lib/type";

export default function PostTool({
  onSend,
  onChooseImage,
}: {
  onSend?: () => void;
  onChooseImage?: (media: ChooseMedia[]) => void;
}) {
  const ToolItem = ({
    icon,
    title,
    onClick,
    className,
  }: {
    icon: string;
    title: string;
    className: string;
    onClick?: () => void;
  }) => {
    return (
      <div className={"flex flex-col items-center space-y-1"}>
        <div
          className={"bg-primary-200 rounded-2xl p-2 w-fit h-fit"}
          onClick={onClick}
        >
          <SvgIcon
            src={icon}
            color={config.app.colors.secondary["900"]}
            className={className}
          />
        </div>
        <p className={"font-bold text-sm text-secondary-900"}>{title}</p>
      </div>
    );
  };

  const handleChooseImage = async () => {
    const res = await chooseMedia();
    if (!onChooseImage) return;
    onChooseImage(res);
  };

  return (
    <div
      className={"bg-white rounded-2xl p-5 flex flex-row gap-4 justify-between"}
    >
      <ToolItem
        icon={ImageIcon}
        className={"h-10 w-10"}
        onClick={handleChooseImage}
        title={"图片"}
      />
      <div
        style={{
          borderLeft: `solid 1px ${config.app.colors.secondary["500"]}`,
        }}
      >
        <div className={"ml-4"}>
          <ToolItem
            icon={SendIcon}
            className={"h-10 w-10"}
            onClick={onSend}
            title={"发送"}
          />
        </div>
      </div>
    </div>
  );
}
