// @ts-nocheck
import { useEffect, useState, useCallback, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';

// eslint-disable-next-line import/prefer-default-export
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return debouncedValue;
};

export const useTimeout = (callback = () => {}, timeout = 0) => {
  const timeoutIdRef = useRef();
  const cancel = useCallback(() => {
    const timeoutId = timeoutIdRef.current;
    if (timeoutId) {
      timeoutIdRef.current = undefined;
      clearTimeout(timeoutId);
    }
  }, [timeoutIdRef]);

  useEffect(() => {
    timeoutIdRef.current = setTimeout(callback, timeout);
    return cancel;
  }, [callback, timeout, cancel]);

  return cancel;
};

export const useResponsive = () => {
  const isMobile = useMediaQuery({
    maxWidth: 767,
  });

  const isTablet = useMediaQuery({
    minWidth: 768,
    maxWidth: 1023,
  });
  const isTabletOrMobile = useMediaQuery({
    maxWidth: 1023,
  });
  return {
    isMobile,
    isTablet,
    isTabletOrMobile,
  };
};
