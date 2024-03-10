import { Text } from "@tarojs/components";

export function KVInfo({
  title,
  value,
  className,
}: {
  title?: string;
  value?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-2 text-secondary-900 ${className}`}>
      <h2 className={"font-medium"}>{title}</h2>
      <Text className={"font-light text-sm"} selectable userSelect>
        {value}
      </Text>
    </div>
  );
}
