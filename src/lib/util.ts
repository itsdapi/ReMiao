import {
  AppRuntime,
  ChooseMedia,
  ErrorDisplayType,
  NotificationConfig,
  RequestError,
  RequestType,
  TopHeightReturnType,
} from "@/lib/type";
import {
  UserInfo,
  getSystemInfo,
  createIntersectionObserver,
  getMenuButtonBoundingClientRect,
  setStorageSync,
  getStorageSync,
  editImage as TaroEditImage,
  previewImage as TaroPreviewImage,
  getUserProfile,
  downloadFile as TaroDownloadFile,
  uploadFile as TaroUploadFile,
  navigateTo,
  showToast as TaroShowToast,
  showActionSheet as TaroShowActionSheet,
  login as TaroLogin,
  request as TaroRequest,
  chooseMedia as TaroChooseMedia,
  navigateBack,
  switchTab,
} from "@tarojs/taro";
import { RespondErrorType } from "@/lib/miao-api/type";
import { config as AppConfig } from "@/lib/config";

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

export async function writeLocalRuntime(config: AppRuntime) {
  console.log("writing runtime");
  const serialized = JSON.stringify(config);
  setStorageSync("runtime", serialized);
  console.log("Runtime saved!");
}

export async function getLocalRuntime() {
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
          const error = result.data as RespondErrorType;
          rej(new RequestError(error.msg, error.status));
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

export function errorHandler(errMsg: string, type: ErrorDisplayType) {
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

export function isBlank(str: string) {
  return str.trim() === "";
}

export async function isShowNotification(id: number) {
  const config = await getUserNotificationConfig();
  return !config.includes(id);
}

export async function userReadNotification(id: number) {
  try {
    let config = await getUserNotificationConfig();
    config.push(id);
    setStorageSync("notification", config);
  } catch (e) {
    errorHandler("写公告配置失败", "toast");
    console.error("Write user notification config fail!");
  }
}

export async function getUserNotificationConfig() {
  try {
    const config = getStorageSync("notification");
    if (!config) {
      console.log("Local notification storage not exist, creating");
      setStorageSync("notification", []);
      return [] as NotificationConfig;
    }
    return config as NotificationConfig;
  } catch (e) {
    throw new Error("Get Notification Config Fail!");
  }
}

export function getEnvMode() {
  return process.env.NODE_ENV;
}

export function getTaroUserInfo(): Promise<UserInfo> {
  return new Promise((resolve, reject) => {
    getUserProfile({
      desc: "用于完善用户资料",
      success: (res) => {
        resolve(res.userInfo);
      },
      fail: (error) => {
        reject(error);
      },
    });
  });
}

export function downloadFile(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    TaroDownloadFile({
      url: url,
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          // console.log("download success", res);
          resolve(res.tempFilePath);
        } else {
          reject(res.errMsg);
        }
      },
      fail: (error) => {
        reject(error);
      },
    });
  });
}

export function uploadFile(
  url: string,
  filePath: string,
  name: string,
  header?: object,
  formData?: object
): Promise<string> {
  return new Promise((resolve, reject) => {
    TaroUploadFile({
      url: url,
      filePath: filePath,
      name: name,
      header: header,
      formData: formData,
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data);
        } else {
          reject(res.errMsg);
        }
      },
      fail: (error) => {
        reject(error);
      },
    });
  });
}

export function getFileExtName(filePath: string) {
  // console.log("getting ext", filePath);
  return filePath.substring(filePath.indexOf(".") + 1).toLowerCase();
}

export function chooseMedia(): Promise<ChooseMedia[]> {
  return new Promise((resolve, reject) => {
    TaroChooseMedia({
      mediaType: ["image"],
      success: (res) => {
        resolve(res.tempFiles);
      },
      fail: (error) => {
        reject(error);
      },
    });
  });
}

export function editImage(src: string): Promise<string> {
  return new Promise((resolve, reject) => {
    TaroEditImage({
      src: src,
      success: (res) => {
        resolve(res.tempFilePath);
      },
      fail: (error) => {
        reject(error);
      },
    });
  });
}

export function showActionSheet(
  params: { action: () => void; title: string }[]
): Promise<number | undefined> {
  const titles = params.map((item) => item.title);
  return new Promise((resolve) => {
    TaroShowActionSheet({
      itemList: titles,
      success: (res) => {
        params[res.tapIndex].action();
        resolve(res.tapIndex);
      },
    });
  });
}

export function previewImage(
  urls: string[],
  options: { saveImage?: boolean; menu?: boolean; current?: string }
) {
  return new Promise((resolve, reject) => {
    TaroPreviewImage({
      urls: urls,
      current: options.current,
      showmenu: options.menu,
      enablesavephoto: options.saveImage,
      enableShowPhotoDownload: options.saveImage,
      success: resolve,
      fail: reject,
    });
  });
}

export function goBack() {
  navigateBack({
    delta: 1,
    fail: () => {
      switchTab({
        url: AppConfig.app.indexPagePath,
      });
    },
  });
}
