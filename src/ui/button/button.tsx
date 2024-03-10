import { View } from "@tarojs/components";
import { ReactNode } from "react";
import SvgIcon from "@/ui/svg-icon";
import BackIcon from "@/public/icon/back.svg";
import { goBack } from "@/lib/util";
import "./button.css";

export function RoundBtn({
  className,
  children,
  onClick,
}: {
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
}) {
  return (
    <View>
      <View
        className={`text-sm rounded-full shrink-0 w-fit text-secondary-900 px-4 py-[0.4rem] bg-primary-300 transition-opacity ${className}`}
        hoverClass={"active"}
        onClick={onClick}
      >
        {children}
      </View>
    </View>
  );
}

export function Back() {
  const handleBackClick = () => {
    goBack();
  };

  return (
    <SvgIcon
      src={BackIcon}
      size={18}
      color={"black"}
      className={`absolute bottom-0 left-4`}
      onClick={handleBackClick}
    />
  );
}
