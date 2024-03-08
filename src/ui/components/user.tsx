import Avatar from "@/ui/avatar";
import toIcon from "@/public/icon/to.svg";
import qrCodeIcon from "@/public/icon/qrcode.svg";
import Tag from "@/ui/tag";
import { getCurrentUserInfo } from "@/lib/miao-api/user";
import { getQrCode } from "@/lib/miao-api/qrcode";
import SvgIcon from "@/ui/svg-icon";
import { config } from "@/lib/config";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import useSWR from "swr";
import { navigateTo, useDidShow } from "@tarojs/taro";
import MySuspense from "@/ui/my-suspense";
import { QRSkeleton, UserInfoSkeleton } from "@/ui/skeleton";
import { UserRole } from "@/lib/miao-api/enum";

export default function User() {
  const fileUrl = useSelector((state: RootState) => state.login.data?.fileUrl);
  const {
    data: userInfo,
    mutate: mutateUserInfo,
    isLoading: userInfoLoading,
  } = useSWR("userinfo", getCurrentUserInfo, {
    revalidateOnMount: false,
  });
  const {
    data: userQrCode,
    mutate: mutateUserQrCode,
    isLoading: qrLoading,
  } = useSWR("qrcode", getQrCode, {
    revalidateOnMount: false,
  });

  useDidShow(async () => {
    await mutateUserInfo();
  });

  const handleUpdateUserInfoClick = async () => {
    // await updateUserInfo(await getTaroUserInfo());
    // await mutateUserInfo();
    navigateTo({ url: config.app.loginPath });
  };

  return (
    <>
      <div className={"h-[1.7rem]"} />
      <div className={"shadow-bb rounded-2xl bg-white px-7 relative"}>
        <div className={""} style={{ transform: "translateY(-1.7rem)" }}>
          {userInfo && (
            <Avatar
              src={`${fileUrl}/${userInfo?.avatarFileName}`}
              className={"h-[5.3rem] w-[5.3rem] z-0"}
            />
          )}
          <div className={"mt-2"} style={{ zIndex: 1 }}>
            <MySuspense
              loading={userInfoLoading}
              fallback={<UserInfoSkeleton />}
            >
              <p className={"font-bold text-2xl text-secondary-900 ml-1 mb-1"}>
                {userInfo?.nickName}
              </p>
              {userInfo && <Tag isActive text={UserRole[userInfo.role]} />}
            </MySuspense>
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

        <MySuspense loading={qrLoading} fallback={<QRSkeleton />}>
          <div
            className={"absolute h-full w-4/12 top-0 right-9 flex items-center"}
            onClick={() => mutateUserQrCode()}
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
        </MySuspense>
      </div>
    </>
  );
}
