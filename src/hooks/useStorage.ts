import { useState } from "react";

type ValueFn<T> = (value: T) => T;

type Value<T> = T | ValueFn<T>;

interface SetValue<T> {
  (value: Value<T>): void;
}

const useStorage = <T>(storage: Storage, key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = storage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue: SetValue<T> = (value) => {
    try {
      const valueToStore =
        typeof value === "function"
          ? (value as ValueFn<T>)(storedValue)
          : value;
      setStoredValue(valueToStore);
      storage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
};

export default useStorage;
