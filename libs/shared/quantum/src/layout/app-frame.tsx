import React from "react";
import { Outlet } from "react-router-dom";
import { useAtom, useSetAtom } from "jotai";

import { useBreakpoint } from "../hooks/use-breakpoints";
import { activeWorkspace$ } from "../workspaces";
import { useNavigateOnSwitch } from "../workspaces/hooks";

import { MobileHeader } from "./mobile-header";
import { isMobileSidebarOpen$ } from "./state";
import { ThemeProvider } from "./theme-provider";
import { WorkspacesList } from "./workspaces-list";

export const AppFrame: React.FC = () => {
    const { isLargerThan } = useBreakpoint();

    const setIsMobileSidebarOpen = useSetAtom(isMobileSidebarOpen$);
    const [activeWorkspace] = useAtom(activeWorkspace$);

    useNavigateOnSwitch();

    const isMobileView = !isLargerThan("sm");

    return (
        <ThemeProvider defaultTheme="dark">
            <div className="flex h-screen w-screen">
                {!isMobileView /* Desktop Layout */ && (
                    <div className="hidden md:flex h-full w-full">
                        {/* Workspace List */}
                        <div className="w-[56px] border-r bg-muted/50 shadow-lg">
                            <WorkspacesList activeWorkspace={activeWorkspace} />
                        </div>
                        <Outlet />
                    </div>
                )}

                {isMobileView && (
                    <div className="flex flex-col h-full w-full md:hidden">
                        <MobileHeader
                            workspace={activeWorkspace}
                            onOpenSidebar={() => setIsMobileSidebarOpen(true)}
                        />
                        <Outlet />
                    </div>
                )}
            </div>
        </ThemeProvider>
    );
};
