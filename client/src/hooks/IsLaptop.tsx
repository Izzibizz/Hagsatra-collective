import { useEffect, useState } from "react";

export const useIsLaptop = () => {
  const [isLaptop, setIsLaptop] = useState(
    window.matchMedia("(min-width: 1024px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handler = (e: MediaQueryListEvent) => {
      setIsLaptop(e.matches);
    };

    mediaQuery.addEventListener("change", handler);

    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, []);

  return isLaptop;
};
