import { CatInfo } from "@/lib/miao-api/type";
import { miaoApiCall } from "@/lib/miao-api/util";

export async function newCat(catInfo: CatInfo) {
  const result = await miaoApiCall(`/manage/cats`, {
    method: "POST",
    body: catInfo,
    apiName: "新建猫咪",
  });
  console.log(`New cat ${catInfo.name} success!`);
  return result;
}

export async function updateCat(catId: number, catInfo: CatInfo) {
  const result = await miaoApiCall(`/manage/cat/${catId}`, {
    method: "PUT",
    body: catInfo,
    apiName: "更新猫咪",
  });
  console.log(`Update cat ${catInfo.name} success!`);
  return result;
}

export async function deleteCat(catId: number) {
  const result = await miaoApiCall(`/manage/cat/${catId}`, {
    method: "DELETE",
    apiName: "删除猫咪",
  });
  console.log(`Delete cat ${catId} success!`);
  return result;
}
