import { View, ViewProps } from "@tarojs/components";

interface SvgIconProps extends ViewProps {
  src: string;
  color: string;
  size: number;
}

export default function SvgIcon(props: SvgIconProps) {
  return (
    <View {...props}>
      <View
        style={{
          mask: "url(" + props.src + ") no-repeat",
          // React官方推荐的WebkitMaskImage写法无法正确编译 故用字符串形式书写
          // https://github.com/NervJS/taro/issues/9198
          // @ts-ignore
          "-webkit-mask": "url(" + props.src + ") no-repeat",
          maskSize: "cover",
          "-webkit-mask-size": "cover",
          height: props.size,
          width: props.size,
          backgroundColor: props.color,
        }}
      />
    </View>
  );
}
