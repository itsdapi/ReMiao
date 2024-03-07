import { miaoApiCall, miaoUploadCall } from "@/lib/miao-api/util";
import { UploadTokenRespond } from "@/lib/miao-api/type";
import { errorHandler, getFileExtName } from "@/lib/util";

export async function upload(filePath: string, isCompressed: boolean) {
  try {
    const extName = getFileExtName(filePath);
    if (!(extName === "jpeg" || extName === "jpg" || extName === "png")) {
      errorHandler("不支持的文件类型", "toast");
      return;
    }
    const uploadConfig = await getUploadToken(
      isCompressed ? "1" : "0",
      extName
    );
    const result = await miaoUploadCall(
      uploadConfig.url,
      filePath,
      uploadConfig.params
    );
    console.log("upload result", result);
    //修改响应token样式 去除多余
    const tokenStart = result.indexOf(":") + 2;
    const tokenEnd = result.indexOf("}") - 1;
    return result.substring(tokenStart, tokenEnd);
  } catch (e) {
    errorHandler("上传文件错误", "toast");
    throw e;
  }
}

export async function getUploadToken(type: "0" | "1", extName: string) {
  return (await miaoApiCall("/files", "POST", {
    type: type,
    extName: extName,
  })) as UploadTokenRespond;
}
