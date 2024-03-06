import { Tag as TagType } from "@/lib/type";
import { useState } from "react";
import Tag from "@/ui/tag";

// eslint-disable-next-line import/no-commonjs

export default function TagSelector({ tags }: { tags: TagType[] }) {
  const [activate, setActivate] = useState<Array<string>>([]);

  const handleTagClick = (id: string) => {
    if (activate.includes(id)) setActivate(activate.filter((e) => e !== id));
    else setActivate(activate.concat(id));
  };

  return (
    <div className={"flex flex-row space-x-2 overflow-y-scroll pb-2"}>
      {tags.map((tag) => (
        <Tag
          key={tag.id}
          text={tag.name}
          isActive={activate.includes(tag.id)}
          onClick={() => handleTagClick(tag.id)}
        />
      ))}
    </div>
  );
}
