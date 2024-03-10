import Image from "@/ui/image";

export default function Avatar({
  src,
  className = "w-24 h-24",
}: {
  src?: string;
  className?: string;
}) {
  return (
    <Image
      ariaLabel={"头像"}
      src={src}
      style={{ border: "solid 4px white" }}
      className={`${className} rounded-full shadow-bb`}
    />
  );
}
