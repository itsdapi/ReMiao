import { AppRuntime, RequestType } from "@/lib/type";
import {
  getSystemInfo,
  createIntersectionObserver,
  getMenuButtonBoundingClientRect,
  setStorage,
  getStorage,
  navigateTo,
  showToast as TaroShowToast,
  login as TaroLogin,
  request as TaroRequest,
} from "@tarojs/taro";

/**
 *
 * @returns 返回从顶上直到按钮的高度（非遮挡高度）
 */
export async function getStatusBarHeight() {
  const value = (await getSystemInfo()).statusBarHeight;
  const memuHeight = getMenuButtonBoundingClientRect().height;
  return value ? value + memuHeight : 0;
}

export async function writeRuntime(config: AppRuntime) {
  console.log("writing runtime");
  const serialized = JSON.stringify(config);
  await setStorage({
    key: "runtime",
    data: serialized,
  });
  console.log("Runtime saved!");
}

export async function getRuntime() {
  const serialized = (await getStorage({ key: "runtime" })).data;
  if (serialized !== undefined) {
    try {
      // console.log(`Object ${key} retrieved successfully`);
      return JSON.parse(serialized) as AppRuntime;
    } catch (e) {
      console.error("Error parsing JSON:", e);
      throw e;
    }
  } else {
    throw new Error("Runtime config not found.");
  }
}

export async function getToken() {
  return (await getRuntime()).userData.token;
}

export async function login() {
  return await TaroLogin();
}

export async function request(
  method: RequestType,
  url: string,
  data?: any,
  header?: any
): Promise<any> {
  return new Promise((res, rej) => {
    TaroRequest({
      method: method,
      url: url,
      data: data,
      header: header,
      success: (result) => {
        if (result.statusCode >= 200 && result.statusCode < 300) {
          res(result.data);
        } else {
          rej(result.data);
        }
      },
      fail: (error) => {
        rej(error.errMsg);
      },
    });
  });
}

export function showToast(
  title: string,
  icon?: "success" | "error" | "loading" | "none",
  duration = 2000
) {
  TaroShowToast({
    title: title,
    icon: icon,
    duration: duration,
  });
}

export function errorHandler(errMsg: string, type: "toast" | "page") {
  if (type === "page") {
    navigateTo({ url: `/pages/error?errorMessage=${errMsg}` });
  } else if (type === "toast") {
    showToast(errMsg, "error");
  }
}

export function initIntersectObserver(
  component: any,
  intersectTargetSelector: string,
  observeTargetSelector: string,
  setStateFn: React.Dispatch<React.SetStateAction<boolean>>
) {
  const observer = createIntersectionObserver(component, {
    thresholds: [0, 1],
  });
  observer
    .relativeTo(intersectTargetSelector)
    .observe(observeTargetSelector, (res) => {
      // console.log("intersect!", res);
      setStateFn(res.intersectionRatio > 0);
    });
}
