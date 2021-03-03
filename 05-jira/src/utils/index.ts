import { useEffect, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const cleanObject = (obj: object) => {
  const result = { ...obj };
  Object.keys(obj).forEach((key) => {
    // @ts-ignore
    if (isFalsy(obj[key])) delete result[key];
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

// export const debounce = (fn, delay) => {
//   let timeout;
//   return (...rest) => {
//     if (timeout) clearTimeout(timeout);
//     timeout = setTimeout(() => {
//       fn(...rest);
//     }, delay);
//   };
// };

// export const throttle = (fn, wait) => {
//   let prev = new Date();
//   return (...rest) => {
//     const now = new Date();
//     if (now - prev > wait) {
//       fn(...rest);
//       prev = new Date();
//     }
//   };
// };

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    // 在执行当前 effect 之前对上一个 effect 进行清除s
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debounceValue;
};

export const useArray = <V>(list: V[]) => {
  const [value, setValue] = useState(list);
  const clear = () => {
    setValue([]);
  };
  const removeIndex = (index: number) => {
    const newValue = [...value];
    newValue.splice(index, 1);
    setValue(newValue);
  };
  const add = (item: V) => {
    setValue([...value, item]);
  };

  return {
    value,
    clear,
    removeIndex,
    add,
  };
};
