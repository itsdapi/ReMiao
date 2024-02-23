import Image from "@/ui/image";

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
    <div className={`bg-red-300 ${className}}`}>
      <Image
        src={src}
        ariaLabel={title ? title : "空图片"}
        className={"h-20 w-full"}
        mode={"aspectFill"}
      />
      <h2 className={"text-primary-900 bottom-0"}>{title}</h2>
      <h3 className={" top-0"}>{desc}</h3>
    </div>
  );
}
