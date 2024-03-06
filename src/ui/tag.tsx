import React from "react";

interface TagProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  disable?: boolean;
  isActive?: boolean;
  text?: string;
}

export default function Tag(props: TagProps) {
  return (
    <div
      className={`text-sm rounded-full shrink-0 w-fit ${
        props.isActive && !props.disable ? "bg-primary-600" : "bg-primary-200"
      } text-secondary-900 px-4 py-[0.4rem] ${props.className}`}
      {...props}
    >
      {props.text}
    </div>
  );
}
