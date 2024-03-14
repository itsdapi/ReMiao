import { Contact, SettingQuery, Settings } from "@/lib/miao-api/type";
import { miaoApiCall } from "@/lib/miao-api/util";
import { ErrorDisplayType } from "@/lib/type";

export async function getSettings(
  querys: SettingQuery[],
  overwriteToken?: string,
  errorHandleType?: ErrorDisplayType
) {
  return (await miaoApiCall("/settings", {
    method: "POST",
    body: querys,
    apiName: "取设置",
    overwriteToken: overwriteToken,
    errorHandleType: errorHandleType,
  })) as Settings;
}

export async function getFileUrl(token: string) {
  return (
    await getSettings([{ key: "files.url", nullable: false }], token, "page")
  )["files.url"] as string;
}

export async function getOrgInfo() {
  return (await getSettings([{ key: "introduction", nullable: false }]))[
    "introduction"
  ] as string;
}

export async function getContactInfo() {
  return (await getSettings([{ key: "contact", nullable: false }]))[
    "contact"
  ] as Contact[];
}
