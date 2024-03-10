import { miaoApiCall } from "@/lib/miao-api/util";
import { UserInfo } from "@/lib/miao-api/type";
import { upload } from "@/lib/miao-api/file";

export async function getCurrentUserInfo() {
  return (await miaoApiCall(
    "/user",
    "GET",
    null,
    undefined,
    "取用户"
  )) as UserInfo;
}

export async function updateUserInfo({
  nickName,
  localAvatarUrl,
}: {
  nickName: string;
  localAvatarUrl: string;
}) {
  const avatarFileToken = await upload([
    {
      filePath: localAvatarUrl,
      isCompressed: true,
    },
  ]);
  return await miaoApiCall(
    "/user",
    "PUT",
    {
      nickName: nickName,
      avatarFileToken: avatarFileToken[0],
    },
    undefined,
    "更用户"
  );
}
