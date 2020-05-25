import { useRef, useCallback, useEffect } from 'react';

export function useDebounce<Args extends unknown[]>(
  callback: (...args: Args) => void,
  timeout: number,
): (...args: Args) => void {
  const tid = useRef(-1);
  const debouncedFunc = useRef(callback);
  const hasUnmounted = useRef(false);
  debouncedFunc.current = callback;

  useEffect(
    () => () => {
      hasUnmounted.current = true;
    },
    [],
  );

  const debouncedCallback = useCallback(
    (...args: Args) => {
      clearTimeout(tid.current);
      tid.current = setTimeout(() => {
        if (hasUnmounted.current) {
          return;
        }
        debouncedFunc.current(...args);
      }, timeout);
    },
    [timeout],
  );

  return debouncedCallback;
}
