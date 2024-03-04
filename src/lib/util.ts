import { AppRuntime, RequestType, TopHeightReturnType } from "@/lib/type";
import {
  getSystemInfo,
  createIntersectionObserver,
  getMenuButtonBoundingClientRect,
  setStorageSync,
  getStorageSync,
  navigateTo,
  showToast as TaroShowToast,
  login as TaroLogin,
  request as TaroRequest,
} from "@tarojs/taro";

/**
 *
 * @returns 返回从顶上直到按钮的高度（非遮挡高度）
 */
export async function getStatusBarHeight(): Promise<TopHeightReturnType> {
  let statusBarHeight = (await getSystemInfo()).statusBarHeight;
  const menu = getMenuButtonBoundingClientRect();
  if (!statusBarHeight) statusBarHeight = 0;
  return {
    full: statusBarHeight + menu.height + 13,
    menu: menu.top + menu.height / 2,
    statusbar: statusBarHeight,
  };
}

export async function writeRuntime(config: AppRuntime) {
  console.log("writing runtime");
  const serialized = JSON.stringify(config);
  setStorageSync("runtime", serialized);
  console.log("Runtime saved!");
}

export async function getRuntime() {
  try {
    const serialized = await getStorageSync("runtime");
    if (!serialized) {
      console.log("Runtime retrieved failed!");
      return undefined;
    }
    // console.log(`Runtime retrieved successfully`, serialized);
    return JSON.parse(serialized) as AppRuntime;
  } catch (e) {
    console.error("Error parsing JSON:", e);
    throw e;
  }
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
