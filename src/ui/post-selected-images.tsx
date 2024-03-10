import { ChooseMedia } from "@/lib/type";
import Image from "@/ui/image";
import { View } from "@tarojs/components";
import { showActionSheet } from "@/lib/util";

export default function PostSelectedImages({
  images,
  onDelete,
  onClickImage,
}: {
  images?: ChooseMedia[];
  onDelete?: (path: string) => void;
  onClickImage?: (index: number) => void;
}) {
  const handleImageLongPress = async (path: string, index: number) => {
    if (!onDelete || !onClickImage) return;
    await showActionSheet([
      {
        title: "编辑",
        action: () => onClickImage(index),
      },
      {
        title: "删除",
        action: () => onDelete(path),
      },
    ]);
  };

  const handleImageClick = (index: number) => {
    if (!onClickImage) return;
    onClickImage(index);
  };

  return (
    <div
      className={"bg-white rounded-2xl min-h-14 p-5 gap-y-3 grid grid-cols-3"}
    >
      {images?.map((image, index) => (
        <View
          className={" w-fit mx-auto"}
          key={image.tempFilePath}
          onClick={() => handleImageClick(index)}
          onLongPress={() => handleImageLongPress(image.tempFilePath, index)}
        >
          <Image
            ariaLabel={"用户上传照片"}
            src={image.tempFilePath}
            className={"max-h-24 max-w-24 rounded-2xl"}
          />
        </View>
      ))}
    </div>
  );
}
