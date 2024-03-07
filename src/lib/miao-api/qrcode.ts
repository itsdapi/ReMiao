import { miaoApiCall } from "@/lib/miao-api/util";
import { QrCode } from "@/lib/miao-api/type";

export async function getQrCode() {
  const params = {
    size: "200",
    foregroundColor: "000000",
    backgroundColor: "FFFFFF00",
  };
  return (await miaoApiCall(
    "/qrcode/user",
    "GET",
    null,
    params,
    "取二维码"
  )) as QrCode;
}
