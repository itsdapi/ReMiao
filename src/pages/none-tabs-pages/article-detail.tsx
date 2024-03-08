import { WebView } from "@tarojs/components";
import { useState } from "react";
import { useLoad } from "@tarojs/taro";

interface Props {
  url: string;
}
export default function ArticleDetail() {
  const [url, setUrl] = useState<string>();
  useLoad((e: Props) => setUrl(e.url));

  const handleError = (err) => {
    console.error(err);
  };

  return url && <WebView src={url} onError={handleError} />;
}
