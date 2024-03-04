import { config } from "@/lib/config";
import { LoginRespond } from "@/lib/miao-api/type";
import { MIAO_API_LOGIN_PATH } from "@/lib/static";
import { RequestType } from "@/lib/type";
import { errorHandler, getRuntime, login, request } from "@/lib/util";
import { store } from "@/lib/redux/store";
import {
  actionFetchLoginData,
  actionLoadLoginData,
} from "@/lib/redux/login-slice";

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
 * @param overwriteToken 覆盖获取token的方式 用于未登陆的时候直接调用
 * @returns
 */
export async function miaoApiCall(
  path: string,
  method: RequestType,
  body: { [key: string]: any } | null,
  params?: {
    [key: string]: string;
  },
  apiName?: string,
  overwriteToken?: string
) {
  // await miaoLogin();
  const searchParams = new URLSearchParams(params);
  let token = overwriteToken ? overwriteToken : await getToken();
  const url = `${config.api.url}${path}?${searchParams.toString()}`;
  const headers = {
    Authorization: "Bearer " + token,
  };
  // console.log(`token ${apiName}`, token);
  try {
    // console.log(`miao api call, method: ${method}, url: ${url}`);
    return (await request(method, url, body, headers)) as any;
  } catch (error) {
    errorHandler(`${apiName ? apiName : ""}调用失败`, "toast");
    throw error;
  }
}

async function getToken() {
  // 首先会尝试从Redux中获取运行时
  let reduxRuntime = store.getState().login.data;
  // console.log("reduxRuntime", reduxRuntime);
  if (!reduxRuntime) {
    // 如果Redux中没有就去localStorage中拿
    const localRuntime = await getRuntime();
    // console.log("localRuntime", localRuntime);
    if (!localRuntime) {
      // 如果localStorage也是空的话 就是第一次登陆 需要执行miaoLogin()
      // 这一步会把运行时写入localStorage和Redux login state
      await store.dispatch(actionFetchLoginData());
      reduxRuntime = store.getState().login.data;
    } else {
      await store.dispatch(actionLoadLoginData());
      reduxRuntime = store.getState().login.data;
    }
  }
  // console.log("return redux runtime", reduxRuntime);
  if (!reduxRuntime) {
    // 如果这样都无法获取Token的话那就是出问题了
    throw new Error("Fail to get token!");
  }
  return reduxRuntime.userData.token;
}
