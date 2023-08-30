import { useEffect, DependencyList } from "react";
import useAsyncFn from "./useAsyncFn";

const useAsync = <T>(
  fn: () => Promise<T>,
  deps: DependencyList
): [state: any, callback: () => void] => {
  //@ts-expect-error: 배포중오류
  const [state, callback] = useAsyncFn(fn, deps);

  useEffect(() => {
    //@ts-expect-error: 배포중오류
    callback();
  }, [callback]);
  //@ts-expect-error: 배포중오류
  return state;
};

export default useAsync;
