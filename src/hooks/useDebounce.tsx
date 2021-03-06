import React from 'react';

type Callback = () => void;

interface ReturnProps {
  withDebounce: (c: Callback) => void;
}

const useDebounce = (delay = 500): ReturnProps => {
  const [callback, setCallback] = React.useState<Callback>();

  React.useEffect(() => {
    if (callback) {
      const handler = setTimeout(() => {
        callback();
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }
  }, [callback, delay]);

  return {
    withDebounce: (callback: Callback) => setCallback(() => callback),
  };
};

export default useDebounce;
