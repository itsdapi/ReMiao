import { CatList } from "@/lib/miao-api/type";
import { miaoApiCall } from "@/lib/miao-api/util";

export async function getCatList(limit = 20, offset = 0) {
  const result = (await miaoApiCall(
    "/cats",
    "GET",
    null,
    {
      limit: limit.toString(),
      start: offset.toString(),
    },
    "猫列表"
  )) as CatList[];
  console.log(`fetch ${result.length} cats (^^ )`);
  return result;
}
