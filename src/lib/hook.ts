import { useCallback, useEffect, useMemo, useState } from "react";

export function useFetch<T>(
  fetchFn: (params: any) => Promise<T>,
  params?: any,
  displayResult?: boolean
) {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [newParams, setNewParams] = useState(params);
  const fetchCall = useCallback(async () => {
    // console.log("useCallback");
    const res = await fetchFn(newParams);
    if (displayResult) console.log("useFetch", res);
    setLoading(true);
    setData(res);
    setLoading(false);
  }, [fetchFn, newParams]);

  useEffect(() => {
    // console.log("useEffect");
    fetchCall();
  }, [fetchCall]);

  const doFetch = useCallback((rest: any) => setNewParams(rest), []);
  const reFetch = () => setNewParams(Object.assign({}, newParams));
  return {
    data,
    loading,
    doFetch,
    reFetch,
  };
}

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
