import { Input, InputProps } from "@tarojs/components";
import SvgIcon from "@/ui/svg-icon";
import searchIcon from "@/public/icon/search.svg";

export default function SearchInput(props: InputProps) {
  return (
    <div
      className={`bg-gray-200/90 rounded-lg flex flex-row p-2 items-center z-50 ${props.className}`}
    >
      <SvgIcon src={searchIcon} color={"grey"} size={24} className={"w-fit"} />
      <Input {...props} className={"pl-2 w-full"} />
    </div>
  );
}
