import { useEffect, DependencyList } from "react";
import useAsyncFn from "./useAsyncFn";

const useAsync = <T>(
  fn: () => Promise<T>,
  deps: DependencyList
): [state: any, callback: () => void] => {
  const [state, callback] = useAsyncFn(fn, deps);

  useEffect(() => {
    callback();
  }, [callback]);

  return state;
};

export default useAsync;
