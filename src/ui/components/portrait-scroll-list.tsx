import { CoverPhoto } from "@/lib/miao-api/type";
import { PortraitCard } from "@/ui/cards";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { previewImage } from "@/lib/util";

export default function PortraitScrollList({
  photos,
}: {
  photos?: CoverPhoto[];
}) {
  const fileUrl = useSelector((state: RootState) => state.login.data?.fileUrl);
  const handleImageClick = async (currPath: string) => {
    if (!photos) return;
    const urls = photos.map((photo) => `${fileUrl}/${photo.fileName}`);
    // console.log(`previewing current ${currPath}`, urls);
    await previewImage(urls, {
      current: currPath,
      saveImage: true,
      menu: true,
    });
  };

  return (
    <div
      className={
        "flex flex-row overflow-x-scroll space-x-5 pl-[4.8rem] pr-[4.5rem] overflow-visible min-h-[25rem] mb-[-6rem]"
      }
    >
      {photos?.map((photo) => (
        <PortraitCard
          src={`${fileUrl}/${photo.fileName}`}
          ariaLabel={"一张猫的图片"}
          key={photo.id}
          onClick={() => handleImageClick(`${fileUrl}/${photo.fileName}`)}
        />
      ))}
    </div>
  );
}
