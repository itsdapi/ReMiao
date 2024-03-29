import { config } from "@/lib/config";
import { LoginRespond } from "@/lib/miao-api/type";
import { MIAO_API_LOGIN_PATH } from "@/lib/static";
import { ErrorDisplayType, RequestError, RequestType } from "@/lib/type";
import {
  errorHandler,
  getLocalRuntime,
  login,
  request,
  uploadFile,
} from "@/lib/util";
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

interface miaoApiCallOption {
  // 请求方法
  method?: RequestType;
  // 请求body数据
  body?: { [key: string]: any } | null;
  // 请求url参数
  params?: {
    [key: string]: string;
  };
  // 请求api名字 3个字
  apiName?: string;
  // 覆盖获取token的方式 用于未登陆的时候直接调用
  overwriteToken?: string;
  // 重试次数 修改本函数的默认值来调整重试次数 设置为0时终结
  times?: number;
  // 决定出错的展示效果 'page' 会跳转到错误页面 这样或许能让用户认为app坏了hhh
  errorHandleType?: ErrorDisplayType;
}

/**
 *
 * @param path api路径
 * @param options 选项
 * @return
 */
export async function miaoApiCall(path: string, options?: miaoApiCallOption) {
  const times = options?.times ? options?.times : 1;
  const method = options?.method ? options?.method : "GET";
  const body = options?.body ? options?.body : null;
  const params = options?.params;
  const apiName = options?.apiName ? options?.apiName : "请求";
  const errorHandleType = options?.errorHandleType
    ? options.errorHandleType
    : "toast";
  const overwriteToken = options?.overwriteToken;

  // await miaoLogin();
  const searchParams = new URLSearchParams(params);
  let token = overwriteToken ? overwriteToken : await getToken();
  const url = `${config.api.url}${path}?${searchParams.toString()}`;
  const headers = {
    Authorization: "Bearer " + token,
  };
  // console.log(`token ${apiName}`, token);
  try {
    // console.log(
    //   `miao api call, method: ${method}, url: ${url}, header: ${headers.toString()}`
    // );
    return (await request(method, url, body, headers)) as any;
  } catch (error) {
    if (error instanceof RequestError) {
      if (error.status === 401 && times > 0) {
        console.log(`Request retry at ${times}`);
        return await miaoApiCall(path, {
          body: body,
          params: params,
          apiName: apiName,
          method: method,
          errorHandleType: errorHandleType,
          overwriteToken: await getToken(true),
          times: times - 1,
        });
      }
    }
    errorHandler(
      `${apiName ? apiName : ""}调用失败`,
      errorHandleType ? errorHandleType : "toast"
    );
    throw error;
  }
}

export async function miaoUploadCall(
  url: string,
  filePath: string,
  uploadParams: object
) {
  const header = {
    "Content-Type": "multipart/form-data",
  };
  return uploadFile(url, filePath, "file", header, uploadParams);
}

async function getToken(isNew?: boolean) {
  if (isNew) {
    console.log("Requesting a new Token");
    await store.dispatch(actionFetchLoginData());
  }
  const reduxRuntime = await getRuntime();

  return reduxRuntime.userData.token;
}

export async function getFileUrl() {
  return (await getRuntime()).fileUrl;
}

async function getRuntime() {
  // 首先会尝试从Redux中获取运行时
  let reduxRuntime = store.getState().login.data;
  // console.log("reduxRuntime", reduxRuntime);
  if (!reduxRuntime) {
    // 如果Redux中没有就去localStorage中拿
    const localRuntime = await getLocalRuntime();
    // console.log("localRuntime", localRuntime);
    if (!localRuntime) {
      // 如果localStorage也是空的话 就是第一次登陆 需要执行miaoLogin()
      // 这一步会把运行时写入localStorage和Redux login state
      await store.dispatch(actionFetchLoginData());
    } else {
      await store.dispatch(actionLoadLoginData());
    }
    reduxRuntime = store.getState().login.data;
  }
  // console.log("return redux runtime", reduxRuntime);
  if (!reduxRuntime) {
    // 如果这样都无法获取Token的话那就是出问题了
    throw new Error("Fail to get token!");
  }
  return reduxRuntime;
}
