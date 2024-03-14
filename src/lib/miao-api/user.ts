import { miaoApiCall } from "@/lib/miao-api/util";
import { UserInfo } from "@/lib/miao-api/type";
import { upload } from "@/lib/miao-api/file";

export async function getCurrentUserInfo() {
  return (await miaoApiCall("/user", {
    method: "GET",
    apiName: "取用户",
  })) as UserInfo;
}

export async function updateUserInfo({
  nickName,
  localAvatarUrl,
}: {
  nickName: string;
  localAvatarUrl: string;
}) {
  const avatarFileToken = (
    await upload([
      {
        filePath: localAvatarUrl,
        isCompressed: true,
      },
    ])
  ).tokenList[0];
  return await miaoApiCall("/user", {
    method: "PUT",
    body: {
      nickName: nickName,
      avatarFileToken: avatarFileToken,
    },
    apiName: "更用户",
  });
}
