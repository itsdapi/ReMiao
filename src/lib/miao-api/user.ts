import { miaoApiCall } from "@/lib/miao-api/util";
import { UserInfo } from "@/lib/miao-api/type";
import { downloadFile } from "@/lib/util";
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
  avatarUrl,
}: {
  nickName: string;
  avatarUrl: string;
}) {
  const localAvatarFilePath = await downloadFile(avatarUrl);
  const avatarFileToken = await upload(localAvatarFilePath, true);
  return await miaoApiCall("/user", "PUT", {
    nickName: nickName,
    avatarFileToken: avatarFileToken,
  });
}
