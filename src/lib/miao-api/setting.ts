import { SettingQuery, Settings } from "@/lib/miao-api/type";
import { miaoApiCall } from "@/lib/miao-api/util";

export async function getSettings(querys: SettingQuery[]) {
  return (await miaoApiCall(
    "/settings",
    "POST",
    querys,
    undefined,
    "取设置"
  )) as Settings;
}

export async function getFileUrl() {
  return (await getSettings([{ key: "files.url", nullable: false }]))[
    "files.url"
  ];
}
