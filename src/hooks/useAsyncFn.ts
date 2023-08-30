import { useCallback, useRef, useState } from "react";

const useAsyncFn = <T>(fn: (...args: any[]) => Promise<T>, deps: any[]) => {
  const lastCallId = useRef(0);
  const [state, setState] = useState<{
    isLoading: boolean;
  }>({
    isLoading: false,
  });

  const callback = useCallback((...args: any[]) => {
    const callId = ++lastCallId.current;

    if (!state.isLoading) {
      setState({ ...state, isLoading: true });
    }

    return fn(...args).then(
      (value) => {
        //@ts-expect-error:배포중 오류
        callId === lastCallId.current && setState({ value, isLoading: false });
        return value;
      },
      (error) => {
        //@ts-expect-error:배포중 오류
        callId === lastCallId.current && setState({ error, isLoading: false });
        return error;
      }
    );
    //eslint-disable-next-line
  }, deps);

  return [state, callback];
};

export default useAsyncFn;
