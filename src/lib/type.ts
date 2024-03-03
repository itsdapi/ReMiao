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
  id: string,
  name: string
}
