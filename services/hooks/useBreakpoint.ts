"use client";
import { useState, useEffect } from "react";

export type Breakpoint = "mobile" | "tablet" | "desktop";

export const useBreakpoint = (): Breakpoint => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("desktop");

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 768) setBreakpoint("mobile");
      else if (window.innerWidth < 1280) setBreakpoint("tablet");
      else setBreakpoint("desktop");
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return breakpoint;
};
