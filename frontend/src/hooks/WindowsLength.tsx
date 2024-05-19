import { useState, useEffect } from "react";

function getWindowsDimensions() {
  const { innerWidth: width, innerHeight: height } = window;

  return { width, height };
}
const useWindowsDimensions = () => {
  const [windowsDimensions, setWindowsDimensions] = useState(
    getWindowsDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowsDimensions(getWindowsDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => removeEventListener("resize", handleResize);
  }, []);

  return windowsDimensions;
};

export default useWindowsDimensions;
