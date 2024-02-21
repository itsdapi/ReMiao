import CenterLayout from "@/ui/center-layout";
import { getCurrentInstance } from "@tarojs/runtime";

type params = {
  errorMessage: string;
};

export default function Error() {
  const instance = getCurrentInstance();
  const errorMessage = (instance.router?.params as params).errorMessage;
  return (
    <CenterLayout>
      <h1 className={"text-2xl"}>Oops! 出现了点问题</h1>
      <p className={"overflow-scroll"}>{errorMessage}</p>
    </CenterLayout>
  );
}
