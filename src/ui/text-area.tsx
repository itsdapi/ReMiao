import { Textarea } from "@tarojs/components";

export default function TextArea({
  onBlur,
  placeholder,
}: {
  onBlur: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className={"bg-primary-200 rounded-2xl "}>
      <Textarea
        className={"h-40 p-4 text-secondary-900"}
        placeholder={placeholder}
        placeholderClass={"text-secondary-700"}
        onBlur={(event) => onBlur(event.detail.value)}
      />
    </div>
  );
}
