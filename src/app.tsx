import { PropsWithChildren } from "react";
import { useLaunch, navigateTo, useError } from "@tarojs/taro";
import "./app.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/lib/redux/store";
import "abortcontroller-polyfill/dist/abortcontroller-polyfill-only";

function App({ children }: PropsWithChildren<any>) {
  useLaunch(async () => {
    console.log("App launched.");
  });

  useError((error: string) => {
    console.log("useError", error);
    navigateTo({ url: `/pages/error?errorMessage=${error}}` });
  });

  // children 是将要会渲染的页面
  return (
    <>
      <a />
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
