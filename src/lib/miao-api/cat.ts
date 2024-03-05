import { CatDetail, CatList, SearchResult } from "@/lib/miao-api/type";
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

export async function getCatDetail(id: number) {
  const result = (await miaoApiCall(
    `/cat/${id}`,
    "GET",
    null,
    undefined,
    "猫信息"
  )) as CatDetail;
  console.log(`fetched ${result.info.name} detail (^^_)`);
  return result;
}

export async function searchCat(term: string, limit = 20, offset = 0) {
  if (!term) return [];
  const result = (await miaoApiCall(
    `/cats/search`,
    "GET",
    null,
    {
      keyword: term,
      limit: limit.toString(),
      start: offset.toString(),
    },
    "搜索"
  )) as SearchResult[];
  console.log(`Get ${result.length} search result :)`);
  return result;
}
