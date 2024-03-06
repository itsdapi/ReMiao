import { CoverPhoto } from "@/lib/miao-api/type";
import { PortraitCard } from "@/ui/cards";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

export default function PortraitScrollList({
  photos,
}: {
  photos?: CoverPhoto[];
}) {
  const fileUrl = useSelector((state: RootState) => state.login.data?.fileUrl);
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
        />
      ))}
    </div>
  );
}
