import { getOrgInfo } from "@/lib/miao-api/setting";
import { Image, RichText } from "@tarojs/components";
import HUIHUI from "@/public/image/huihui.svg";
import useSWR from "swr";

export default function OrgInfo() {
  const { data } = useSWR("fetch org info", getOrgInfo);

  return (
    <>
      <div className={"h-[3rem] w-full"} />
      <div
        className={
          "bg-white rounded-2xl flex flex-col items-center h-max shadow-bb px-5"
        }
      >
        <Image
          src={HUIHUI}
          className={"h-36 w-36 shadow-bb rounded-full"}
          style={{ transform: "translateY(-3rem)" }}
        />
        <RichText
          nodes={data}
          className={"text-center font-light text-secondary-900 text-plus"}
          style={{ transform: "translateY(-20px)" }}
        />
      </div>
    </>
  );
}
