import { useEffect } from "react";
import { useAtom } from "jotai";

import { activeWorkspace$ } from "./state";

export const useWorkspaceInitializer = () => {
    const [activeWorkspace] = useAtom(activeWorkspace$);

    useEffect(() => {
        if (activeWorkspace.menu || !activeWorkspace.router) return;

        // Load and register the menu component when workspace is first activated
        const registerMenu = async () => {
            try {
                const routerModule = await (activeWorkspace.router as any)
                    ._payload._result;
                if (routerModule?.menu) {
                    activeWorkspace.menu = routerModule.menu;
                }
            } catch (error) {
                console.warn("Failed to load workspace menu:", error);
            }
        };

        registerMenu();
    }, [activeWorkspace]);
};
