import { useCallback, useEffect, useMemo, useState } from "react";

/**
 * 传入页面的params 传入想要的params 就能返回params object
 * @param pageParams 页面第一层params 要包含tid
 * @param paramNames 需要获取的params 以数组的形式传入 ["id"]
 */
export function useParams<T extends string>(
  pageParams: any,
  paramNames: T[]
): { [K in T]?: string } {
  return useMemo(() => {
    // 解析查询参数
    // console.log("useParams", pageParams);
    const searchParams = new URLSearchParams(pageParams.tid.split("?")[1]);
    return paramNames.reduce((acc, paramName) => {
      const paramValue = searchParams.get(paramName);
      if (paramValue !== null) {
        acc[paramName] = paramValue;
      }
      return acc;
    }, {} as { [K in T]?: string });
  }, [pageParams, paramNames]);
}

interface UFIProps {
  debug?: boolean;
}
/**
 * 封装无限滚动列表请求钩子
 * 用法：
 * getKey接受pageNum,其返回值会传入fetcher作为请求参数
 * @param getKey
 * @param fetcher
 * @param option
 */
export function useFetchInfinite<K, T>(
  getKey: (pageNum: number) => K,
  fetcher: (key: K) => Promise<T[]>,
  option?: UFIProps
) {
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [end, setEnd] = useState(false);
  const [data, setData] = useState<T[]>([]);
  const fetchCall = useCallback(async () => {
    const key = getKey(pageNum - 1);
    setLoading(true);
    const res = await fetcher(key);
    if (option?.debug) console.log(`Page ${pageNum}, result`, res);
    if (res.length === 0) {
      setEnd(true);
      setLoading(false);
      return;
    }
    setData(data.concat(res));
    setLoading(false);
  }, [pageNum]);

  useEffect(() => {
    // console.log("useEffect");
    fetchCall();
  }, [fetchCall]);

  const nextPage = useCallback(() => {
    if (end) return;
    setPageNum(pageNum + 1);
  }, [pageNum]);

  return {
    data,
    pageNum,
    nextPage,
    loading,
  };
}
