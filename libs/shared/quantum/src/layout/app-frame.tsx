import React, { useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { Outlet } from "react-router-dom";
import { useAtom } from "jotai";

import { Button } from "../components/button";
import { useNavigateOnSwitch } from "../effects/workspace-switching";
import { useBreakpoint } from "../hooks/use-breakpoints";
import { cn } from "../utils";

import { MobileHeader } from "./mobile-header";
import { MobileSidebar } from "./mobile-sidebar";
import { ModeToggle } from "./mode-toggle";
import { ThemeProvider } from "./theme-provider";
import { isExplorerCollapsed$ } from "./ui-state";
import { WorkspaceExplore } from "./workspace-explore";
import { WorkspacesList } from "./workspaces-list";

export const AppFrame: React.FC = () => {
    const isMobileView = useBreakpoint() === "sm";
    const [isCollapsed, setIsCollapsed] = useAtom(isExplorerCollapsed$);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    useNavigateOnSwitch();

    return (
        <ThemeProvider defaultTheme="dark">
            <div className="flex h-screen w-screen">
                {!isMobileView /* Desktop Layout */ && (
                    <div className="hidden md:flex h-full w-full">
                        {/* Workspace List */}
                        <div className="w-[56px] border-r bg-muted/50 shadow-lg">
                            <WorkspacesList />
                        </div>

                        {/* Workspace Explore (Collapsible) */}
                        <div
                            className={cn(
                                "relative bg-muted/20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] transition-all duration-300",
                                isCollapsed ? "w-[72px]" : "w-60"
                            )}
                        >
                            <WorkspaceExplore />
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute -right-3 top-3 z-10 h-6 w-6 rounded-full  bg-muted/20 shadow-md"
                                onClick={() => setIsCollapsed(!isCollapsed)}
                            >
                                {isCollapsed ? (
                                    <LuChevronRight className="h-4 w-4" />
                                ) : (
                                    <LuChevronLeft className="h-4 w-4" />
                                )}
                            </Button>
                        </div>

                        {/* Main Chat Area */}
                        <div className="flex-1">
                            <div className="flex h-full flex-col">
                                <header className="flex h-14 items-center justify-between border-b px-6">
                                    <h1 className="text-lg font-semibold">
                                        # general
                                    </h1>
                                    <ModeToggle />
                                </header>
                                <Outlet />
                            </div>
                        </div>
                    </div>
                )}

                {isMobileView && (
                    <div className="flex flex-col h-full w-full md:hidden">
                        <MobileHeader
                            onOpenSidebar={() => setIsMobileSidebarOpen(true)}
                        />
                        <div className="flex-1">
                            <Outlet />
                        </div>
                        <MobileSidebar
                            isOpen={isMobileSidebarOpen}
                            onClose={() => setIsMobileSidebarOpen(false)}
                        />
                    </div>
                )}
            </div>
        </ThemeProvider>
    );
};
