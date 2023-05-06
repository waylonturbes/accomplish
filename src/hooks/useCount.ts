import { useState } from "react";
import { get, set } from "idb-keyval";

export function useCount() {
  const [count, setCount] = useState(0);

  // Getting persisted count and setting local count state to persisted count
  get("count")
    .then((val) => {
      if (!val) {
        setCount(0);
      } else {
        setCount(parseInt(val as string));
      }
    })
    .catch(() => {
      setCount(0);
    });

  const handleCountChange = (action: "increment" | "decrement") => {
    setCount(count + (action === "increment" ? 1 : -1));
    set("count", action === "increment" ? `${count + 1}` : `${count - 1}`);
  };

  return { count, handleCountChange };
}
