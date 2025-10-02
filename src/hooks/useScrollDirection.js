import { useState, useEffect } from "react";

const useScrollDirection = () => {
  const [scrollDir, setScrollDir] = useState("up");

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 60) {
        setScrollDir("down");
      } else {
        setScrollDir("up");
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", updateScrollDirection);
    return () => window.removeEventListener("scroll", updateScrollDirection);
  }, []);

  return scrollDir;
};

export default useScrollDirection;
