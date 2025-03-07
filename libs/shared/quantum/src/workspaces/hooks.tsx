import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";

import { activeWorkspace$ } from "./state";

export const useNavigateOnSwitch = () => {
    const [activeWorkspace] = useAtom(activeWorkspace$);
    const navigate = useNavigate();

    useEffect(() => {
        navigate(activeWorkspace ? "/" + activeWorkspace.id : "/");
    }, [activeWorkspace, navigate]);
};

export const useWorkspaceMenu = () => {
    const [activeWorkspace] = useAtom(activeWorkspace$);

    useEffect(() => {
        if (activeWorkspace.menu || !activeWorkspace.router) return;

        // Load and register the menu component when workspace is first activated
        const registerMenu = async () => {
            try {
                const routerModule =
                    await (activeWorkspace.router as unknown as {
                        menu?: ReactNode;
                    });
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
