import { useEffect, useState } from "react";

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";

const breakpoints = {
    xs: { query: "(max-width: 639px)", rank: 0 },
    sm: { query: "(min-width: 640px) and (max-width: 767px)", rank: 1 },
    md: { query: "(min-width: 768px) and (max-width: 1023px)", rank: 2 },
    lg: { query: "(min-width: 1024px) and (max-width: 1279px)", rank: 3 },
    xl: { query: "(min-width: 1280px)", rank: 4 },
};

export const useBreakpoint = () => {
    const [currentBreakpoint, setCurrentBreakpoint] =
        useState<Breakpoint>("xs");

    useEffect(() => {
        // Create matchMedia listeners for each breakpoint
        const mediaQueryLists = Object.entries(breakpoints).map(
            ([key, { query }]) => ({
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

    return {
        breakpoint: currentBreakpoint,
        isLargerThan: (check: Breakpoint) =>
            breakpoints[currentBreakpoint].rank > breakpoints[check].rank,
    };
};
