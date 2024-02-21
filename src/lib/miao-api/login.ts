import { getFileUrl } from "@/lib/miao-api/setting";
import { miaoTokenCall } from "@/lib/miao-api/util";
import { AppRuntime } from "@/lib/type";

export async function miaoLogin(): Promise<AppRuntime> {
  console.log("Started to login");
  const userData = await miaoTokenCall();
  const fileUrl = await getFileUrl();
  console.log("Login success!");
  return {
    userData: userData,
    fileUrl: fileUrl,
  };
}
