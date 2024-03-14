import { miaoApiCall, miaoUploadCall } from "@/lib/miao-api/util";
import { UploadTokenRespond } from "@/lib/miao-api/type";
import { errorHandler, getFileExtName } from "@/lib/util";

export async function upload(
  files: { filePath: string; isCompressed: boolean }[]
): Promise<{ tokenList: string[]; errorList: number[] }> {
  let errorList: number[] = [];
  const uploadPromises = files.map(async (file, index) => {
    try {
      const extName = getFileExtName(file.filePath);
      if (!(extName === "jpeg" || extName === "jpg" || extName === "png")) {
        errorHandler("不支持的文件类型", "toast");
        console.log("Unsupported file type", file.filePath);
        // 这里抛出错误让catch处统一处理错误
        throw new Error("Unsupported file type");
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
      // console.log("upload result", result);
      //修改响应token样式 去除多余
      const tokenStart = result.indexOf(":") + 2;
      const tokenEnd = result.indexOf("}") - 1;
      return result.substring(tokenStart, tokenEnd);
    } catch (e) {
      errorList.push(index + 1);
      return null;
    }
  });
  const results = await Promise.all(uploadPromises);
  console.log(`Upload complete! Error list ${errorList.toString()}. `, results);
  return {
    tokenList: results.filter((token) => token !== null) as string[],
    errorList: errorList,
  };
}

export async function getUploadToken(type: "0" | "1", extName: string) {
  return (await miaoApiCall("/files", {
    method: "POST",
    body: {
      type: type,
      extName: extName,
    },
  })) as UploadTokenRespond;
}
