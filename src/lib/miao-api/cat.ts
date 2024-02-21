import { CatList } from "@/lib/miao-api/type";
import { miaoApiCall } from "@/lib/miao-api/util";

export async function getCatList(limit = 20, offset = 0) {
  console.log("fetching cat list");
  return (await miaoApiCall(
    "/cats",
    "GET",
    null,
    {
      limit: limit.toString(),
      start: offset.toString(),
    },
    "猫列表"
  )) as CatList[];
}
