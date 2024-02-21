import { SettingQuery, Settings } from "@/lib/miao-api/type";
import { miaoApiCall } from "@/lib/miao-api/util";

export async function getSettings(
  querys: SettingQuery[],
  overwriteToken?: string
) {
  return (await miaoApiCall(
    "/settings",
    "POST",
    querys,
    undefined,
    "取设置",
    overwriteToken
  )) as Settings;
}

export async function getFileUrl(token: string) {
  return (await getSettings([{ key: "files.url", nullable: false }], token))[
    "files.url"
  ];
}
