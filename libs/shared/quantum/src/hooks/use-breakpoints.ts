import { useEffect, useState } from "react";

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";

const breakpoints = {
    xs: "(max-width: 639px)",
    sm: "(min-width: 640px) and (max-width: 767px)",
    md: "(min-width: 768px) and (max-width: 1023px)",
    lg: "(min-width: 1024px) and (max-width: 1279px)",
    xl: "(min-width: 1280px)",
};

export const useBreakpoint = (): Breakpoint => {
    const [currentBreakpoint, setCurrentBreakpoint] =
        useState<Breakpoint>("xs");

    useEffect(() => {
        // Create matchMedia listeners for each breakpoint
        const mediaQueryLists = Object.entries(breakpoints).map(
            ([key, query]) => ({
                key: key as Breakpoint,
                mediaQueryList: window.matchMedia(query),
            })
        );

        const updateBreakpoint = () => {
            for (const { key, mediaQueryList } of mediaQueryLists) {
                if (mediaQueryList.matches) {
                    setCurrentBreakpoint(key);
                    break;
                }
            }
        };

        // Initialize the current breakpoint
        updateBreakpoint();

        // Attach listeners
        mediaQueryLists.forEach(({ mediaQueryList }) => {
            mediaQueryList.addEventListener("change", updateBreakpoint);
        });

        // Cleanup listeners
        return () => {
            mediaQueryLists.forEach(({ mediaQueryList }) => {
                mediaQueryList.removeEventListener("change", updateBreakpoint);
            });
        };
    }, []);

    return currentBreakpoint;
};
