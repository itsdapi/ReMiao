import { PropsWithChildren, useState } from "react";
import { useLaunch } from "@tarojs/taro";
import "./app.css";
import { BrowserRouter } from "react-router-dom";

function App({ children }: PropsWithChildren<any>) {
  useLaunch(async () => {
    console.log("App launched.");
  });

  // children 是将要会渲染的页面
  return (
    <>
      <a />
      <BrowserRouter>{children}</BrowserRouter>
    </>
  );
}

export default App;
