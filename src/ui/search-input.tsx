import { Input, InputProps } from "@tarojs/components";
import SvgIcon from "@/ui/svg-icon";
import searchIcon from "@/public/icon/search.svg";

export default function SearchInput(props: InputProps) {
  return (
    <div className={"bg-gray-200/90 rounded-lg flex flex-row p-2 items-center"}>
      <SvgIcon
        src={searchIcon}
        color={"grey"}
        size={16}
        className={"pr-2 w-fit"}
      />
      <Input {...props} className={"w-full"} />
    </div>
  );
}
