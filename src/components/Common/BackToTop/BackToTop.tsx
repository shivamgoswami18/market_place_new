import React, { useEffect, useRef } from "react";

interface BacktotopProps {}

const Backtotop: React.FC<BacktotopProps> = () => {
  const scrollToTopRef = useRef<HTMLDivElement | null>(null);

  const screenUp = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollToTopRef.current) {
        scrollToTopRef.current.style.display = window.scrollY > 100 ? "flex" : "none";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={scrollToTopRef} className="scrollToTop" onClick={screenUp}>
      <span className="arrow">
        <i className="ti ti-arrow-big-up fs-16" />
      </span>
    </div>
  );
};

export default Backtotop;


