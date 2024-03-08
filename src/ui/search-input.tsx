import { Input, InputProps } from "@tarojs/components";
import SvgIcon from "@/ui/svg-icon";
import searchIcon from "@/public/icon/search.svg";
import { config } from "@/lib/config";

export default function SearchInput(props: InputProps) {
  return (
    <div
      className={`bg-primary-200 rounded-lg flex flex-row p-2 items-center z-50 ${props.className}`}
    >
      <SvgIcon
        src={searchIcon}
        color={config.app.colors.secondary["800"]}
        size={24}
        className={"w-fit"}
      />
      <Input
        {...props}
        className={"pl-2 w-full"}
        placeholderClass={"text-secondary-800"}
      />
    </div>
  );
}
