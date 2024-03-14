import { miaoApiCall } from "@/lib/miao-api/util";
import { FeedbackReturn } from "@/lib/miao-api/type";

/**
 *  发布反馈
 * @param options 选项
 * @return feedbackID 反馈ID
 */
export async function postFeedback(options: {
  // 反馈类型,0表示猫咪问题,1表示小程序问题,2表示组织建议
  type: "0" | "1" | "2" | string;
  // 猫咪ID,若为undefined则不绑定至特定猫咪,仅适用于猫咪问题类型
  catID: number | undefined;
  // 文件Token,成功上传文件后获得
  fileTokens: string[];
  // 反馈内容
  content: string;
}) {
  const result = (await miaoApiCall("/feedbacks", {
    method: "POST",
    body: options,
    apiName: "反馈",
  })) as FeedbackReturn;
  console.log("Feedback send complete", result);
  return result;
}
