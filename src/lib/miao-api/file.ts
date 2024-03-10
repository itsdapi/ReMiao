import { miaoApiCall, miaoUploadCall } from "@/lib/miao-api/util";
import { UploadTokenRespond } from "@/lib/miao-api/type";
import { errorHandler, getFileExtName } from "@/lib/util";

export async function upload(
  files: { filePath: string; isCompressed: boolean }[]
): Promise<string[]> {
  const uploadPromises = files.map(async (file) => {
    try {
      const extName = getFileExtName(file.filePath);
      if (!(extName === "jpeg" || extName === "jpg" || extName === "png")) {
        errorHandler("不支持的文件类型", "toast");
        console.log("Unsupported file type", file.filePath);
        return null;
      }
      const uploadConfig = await getUploadToken(
        file.isCompressed ? "1" : "0",
        extName
      );
      const result = await miaoUploadCall(
        uploadConfig.url,
        file.filePath,
        uploadConfig.params
      );
      console.log("upload result", result);
      //修改响应token样式 去除多余
      const tokenStart = result.indexOf(":") + 2;
      const tokenEnd = result.indexOf("}") - 1;
      return result.substring(tokenStart, tokenEnd);
    } catch (e) {
      errorHandler("上传文件错误", "toast");
      return null;
    }
  });

  const results = await Promise.all(uploadPromises);
  console.log("all upload results", results);
  return results.filter((token) => token !== null) as string[];
}

export async function getUploadToken(type: "0" | "1", extName: string) {
  return (await miaoApiCall("/files", "POST", {
    type: type,
    extName: extName,
  })) as UploadTokenRespond;
}
