import Avatar from "@/ui/avatar";
import toIcon from "@/public/icon/to.svg";
import qrCodeIcon from "@/public/icon/qrcode.svg";
import Tag from "@/ui/tag";
import { useFetch } from "@/lib/hook";
import { getCurrentUserInfo, updateUserInfo } from "@/lib/miao-api/user";
import { getQrCode } from "@/lib/miao-api/qrcode";
import SvgIcon from "@/ui/svg-icon";
import { config } from "@/lib/config";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { useState } from "react";
import { QrCode } from "@/lib/miao-api/type";
import { getTaroUserInfo } from "@/lib/util";

export default function User() {
  const fileUrl = useSelector((state: RootState) => state.login.data?.fileUrl);
  const { data: userInfo, reFetch } = useFetch(getCurrentUserInfo);
  const [userQrCode, setUserQrcode] = useState<QrCode>();

  const handleQRCodeClick = async () => {
    setUserQrcode(await getQrCode());
  };

  const handleUpdateUserInfoClick = async () => {
    await updateUserInfo(await getTaroUserInfo());
    reFetch();
  };

  return (
    <>
      <div className={"h-[1.7rem]"} />
      <div className={"shadow-bb rounded-2xl bg-white px-7 relative"}>
        <div className={""} style={{ transform: "translateY(-1.7rem)" }}>
          <Avatar
            src={`${fileUrl}/${userInfo?.avatarFileName}`}
            className={"h-[5.3rem] w-[5.3rem] z-0"}
          />
          <div className={"mt-2"} style={{ zIndex: 1 }}>
            <p className={"font-bold text-2xl text-secondary-900 ml-1 mb-1"}>
              {userInfo?.nickName}
            </p>
            <Tag isActive text={"管理员"} />
            <span
              onClick={() => handleUpdateUserInfoClick()}
              className={
                "font-light text-secondary-800 text-base ml-1 flex flex-row items-center mt-1"
              }
            >
              更新我的信息
              <SvgIcon
                className={"ml-2"}
                src={toIcon}
                color={config.app.colors.secondary["600"]}
                size={18}
              />
            </span>
          </div>
        </div>

        <div
          className={"absolute h-full w-4/12 top-0 right-9 flex items-center"}
          onClick={() => handleQRCodeClick()}
        >
          {userQrCode ? (
            <SvgIcon
              src={userQrCode.image}
              color={config.app.colors.secondary["900"]}
              className={"aspect-square w-full"}
            />
          ) : (
            <div
              className={
                "aspect-square w-full flex flex-col items-center justify-center gap-2 rounded-2xl"
              }
              style={{
                border: `solid 1px ${config.app.colors.secondary["500"]}`,
              }}
            >
              <SvgIcon
                className={"mt-1"}
                src={qrCodeIcon}
                color={config.app.colors.secondary["900"]}
                size={20}
              />
              <span className={"font-light text-sm"}>加载二维码</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
