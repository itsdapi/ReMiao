export default function SvgIcon({
  src,
  className,
  color,
  size = 40,
}: {
  src: string;
  className?: string;
  color?: string;
  size: number;
}) {
  return (
    <div>
      <div
        className={className}
        style={{
          maskImage: "url(" + src + ")",
          // React官方推荐的WebkitMaskImage写法无法正确编译 故用字符串形式书写
          // https://github.com/NervJS/taro/issues/9198
          // @ts-ignore
          "-webkit-mask-image": "url(" + src + ")",
          height: size,
          width: size,
          maskRepeat: "no-repeat",
          maskSize: "cover",
          WebkitMaskSize: "cover",
          WebkitMaskRepeat: "no-repeat",
          backgroundColor: color,
        }}
      />
    </div>
  );
}
