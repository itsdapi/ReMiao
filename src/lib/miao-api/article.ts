import { miaoApiCall } from "@/lib/miao-api/util";
import { ArticleList } from "@/lib/miao-api/type";

interface ArticleListProps {
  limit: number;
  offset: number;
}

export async function getArticleList(params: ArticleListProps) {
  if (!params) return [];
  const result = (await miaoApiCall("/articles", {
    method: "GET",
    params: {
      limit: params.limit.toString(),
      start: params.offset.toString(),
    },
    apiName: "文列表",
  })) as ArticleList[];
  console.log(`fetch ${result.length} articles (ง'̀-'́)ง`);
  return result;
}
