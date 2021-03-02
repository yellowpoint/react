import { useEffect, useState } from "react";

export const isFalsy = (value) => (value === 0 ? false : !value);

export const cleanObject = (obj) => {
  const result = { ...obj };
  Object.keys(obj).forEach((key) => {
    if (isFalsy(obj[key])) delete result[key];
  });
  return result;
};

export const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, []);
};

export const debounce = (fn, delay) => {
  let timeout;
  return (...rest) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(...rest);
    }, delay);
  };
};

export const throttle = (fn, wait) => {
  let prev = new Date();
  return (...rest) => {
    const now = new Date();
    if (now - prev > wait) {
      fn(...rest);
      prev = new Date();
    }
  };
};

export const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    // 在执行当前 effect 之前对上一个 effect 进行清除s
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debounceValue;
};
