import { config } from "@/lib/config";
import { actionFetchLoginData } from "@/lib/redux/login-slice";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { writeRuntime } from "@/lib/util";
import CenterLayout from "@/ui/center-layout";
import { useLoad, navigateTo, switchTab } from "@tarojs/taro";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLogin, data } = useSelector((state: RootState) => state.login);

  useLoad(async () => {
    dispatch(actionFetchLoginData());
  });

  useEffect(() => {
    if (!data) return;
    writeRuntime(data);
    // if (isLogin) navigateTo({ url: config.app.indexPagePath });
    if (isLogin) switchTab({ url: config.app.indexPagePath });
  }, [isLogin]);

  return (
    <CenterLayout>
      <h1>登陆中...</h1>
    </CenterLayout>
  );
}
