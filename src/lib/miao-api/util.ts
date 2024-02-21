import { config } from "@/lib/config";
import { LoginRespond } from "@/lib/miao-api/type";
import { MIAO_API_LOGIN_PATH } from "@/lib/static";
import { RequestType } from "@/lib/type";
import { errorHandler, getToken, login, request } from "@/lib/util";

export async function miaoTokenCall() {
  const code = (await login()).code;
  const url = `${config.api.url}${MIAO_API_LOGIN_PATH}`;

  try {
    return (await request("POST", url, { code: code })) as LoginRespond;
  } catch (error) {
    errorHandler(`获取Token失败 ${JSON.stringify(error)}}`, "page");
    throw error;
  }
}

/**
 *
 * @param path api路径
 * @param method 请求方法
 * @param body 请求body数据
 * @param params 请求url参数
 * @param apiName api名字 3个字
 * @returns
 */
export async function miaoApiCall(
  path: string,
  method: RequestType,
  body: { [key: string]: any } | null,
  params?: {
    [key: string]: string;
  },
  apiName?: string
) {
  const searchParams = new URLSearchParams(params);
  const token = await getToken();
  const url = `${config.api.url}${path}?${searchParams.toString()}`;
  const headers = {
    Authorization: "Bearer " + token,
  };
  try {
    return (await request(method, url, body, headers)) as any;
  } catch (error) {
    errorHandler(`${apiName ? apiName : ""}调用失败`, "toast");
    throw error;
  }
}
