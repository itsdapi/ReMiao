import { getFileUrl } from "@/lib/miao-api/setting";
import { miaoTokenCall } from "@/lib/miao-api/util";
import { AppRuntime } from "@/lib/type";
import { writeRuntime } from "@/lib/util";

export async function miaoLogin(): Promise<AppRuntime> {
  console.log("Started to login");
  const userData = await miaoTokenCall();
  // console.log("useData", userData);
  const fileUrl = await getFileUrl(userData.token);
  const runtime = {
    userData: userData,
    fileUrl: fileUrl,
  };
  await writeRuntime(runtime);
  console.log("Login success!");
  return runtime;
}
