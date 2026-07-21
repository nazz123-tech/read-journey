"use client";
import { useState, useEffect } from "react";

export type Breakpoint = "mobile" | "tablet" | "desktop";

const getBreakpoint = (width: number): Breakpoint => {
  if (width < 768) return "mobile";
  if (width < 1280) return "tablet";
  return "desktop";
};

export const useBreakpoint = (): Breakpoint => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(() =>
    typeof window !== "undefined"
      ? getBreakpoint(window.innerWidth)
      : "desktop",
  );

  useEffect(() => {
    const update = () => setBreakpoint(getBreakpoint(window.innerWidth));

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return breakpoint;
};
