import { SettingQuery, Settings } from "@/lib/miao-api/type";
import { miaoApiCall } from "@/lib/miao-api/util";
import { ErrorDisplayType } from "@/lib/type";

export async function getSettings(
  querys: SettingQuery[],
  overwriteToken?: string,
  errorHandleType?: ErrorDisplayType
) {
  return (await miaoApiCall(
    "/settings",
    "POST",
    querys,
    undefined,
    "取设置",
    overwriteToken,
    1,
    errorHandleType
  )) as Settings;
}

export async function getFileUrl(token: string) {
  return (
    await getSettings([{ key: "files.url", nullable: false }], token, "page")
  )["files.url"];
}

export async function getOrgInfo() {
  return (await getSettings([{ key: "introduction", nullable: false }]))[
    "introduction"
  ];
}
