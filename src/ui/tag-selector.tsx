import { Tag } from "@/lib/type";
import { useState } from "react";

// eslint-disable-next-line import/no-commonjs
const theme = require("@/lib/theme");

export default function TagSelector({ tags }: { tags: Tag[] }) {
  const [activate, setActivate] = useState<Array<string>>([]);

  const handleTagClick = (id: string) => {
    if (activate.includes(id)) setActivate(activate.filter((e) => e !== id));
    else setActivate(activate.concat(id));
  };

  return (
    <div className={"flex flex-row space-x-2 overflow-y-scroll pb-2"}>
      {tags.map((tag) => (
        <div
          key={tag.id}
          id={tag.id}
          style={{ border: `1px solid ${theme.colors.primary["800"]}` }}
          className={`text-sm rounded-full ${
            activate.includes(tag.id) ? "bg-primary-900" : "bg-white"
          } text-primary-400 px-4 py-1`}
          onClick={() => handleTagClick(tag.id)}
        >
          {tag.name}
        </div>
      ))}
    </div>
  );
}
