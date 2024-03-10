import { LoginRespond } from "@/lib/miao-api/type";

export type Route = {
  text: string;
  pagePath: string;
};

export type Tab = {
  text: string;
  id: number;
  icon: string;
  url: string;
};

export type AppRuntime = {
  userData: LoginRespond;
  fileUrl: string | null;
};

export type RequestType = "POST" | "GET" | "PUT";

export type ErrorMessages = {
  [statusCode: number]: string;
};

export type ErrorType = {
  msg: string;
  status: number;
};

export type Tag = {
  id: string;
  name: string;
};

export type TopHeightReturnType = {
  menu: number;
  statusbar: number;
  full: number;
};

export class RequestError extends Error {
  public status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "RequestError";
    this.status = status;
  }
}

export type NotificationConfig = Number[];

export type ErrorDisplayType = "toast" | "page";

export type ListItemType = {
  id: number;
  title: string;
  icon: string;
  onClick: () => void;
};

export interface ChooseMedia {
  /** 本地临时文件路径 (本地路径) */
  tempFilePath: string;
  /** 本地临时文件大小，单位 B */
  size: number;
  /** 视频的时间长度 */
  duration: number;
  /** 视频的高度 */
  height: number;
  /** 视频的宽度 */
  width: number;
  /** 视频缩略图临时文件路径 */
  thumbTempFilePath: string;
  /** 选择的文件的类型 */
  fileType: string;
  /** 原始的浏览器 File 对象
   * @supported h5
   */
  originalFileObj?: File;
}

export type MeHelpType = {
  title: string;
  desc: string;
  question: string;
};
