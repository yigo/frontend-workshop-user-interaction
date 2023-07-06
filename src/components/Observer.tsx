import { useEffect, useRef, useState } from "react";

export default function Observer({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isvisible, setIsvisible] = useState(false);

  const callbackFunction = (entries) => {
    const [entry] = entries;
    setIsvisible(entry.isIntersecting);
  };

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [containerRef, options]);

  return (
    <div>
      {isvisible && <>{children}</>}
      <div ref={containerRef} />
    </div>
  );
}
