import React, { ReactNode } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { Outlet } from "react-router-dom";
import { useAtom } from "jotai";

import { ComponentWithChildren } from "../component-with-children";
import { Button } from "../components/button";
import { cn } from "../components/utils";
import { useBreakpoint } from "../hooks/use-breakpoints";

import { MobileSidebar } from "./mobile-sidebar";
import { ModeToggle } from "./mode-toggle";
import { isExplorerCollapsed$, isMobileSidebarOpen$ } from "./state";
import { WorkspaceExplore } from "./workspace-explore";

// Explorer component that will be used as WorkspaceFrame.Explorer
const Explorer: ComponentWithChildren = ({ children }) => {
    // This component doesn't render anything directly
    // It just passes its children to be rendered by the parent
    return null;
};

export const WorkspaceFrame: ComponentWithChildren & {
    Explorer: ComponentWithChildren;
} = ({ children }) => {
    const { isLargerThan } = useBreakpoint();

    const [isCollapsed, setIsCollapsed] = useAtom(isExplorerCollapsed$);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] =
        useAtom(isMobileSidebarOpen$);

    const isMobileView = !isLargerThan("sm");

    let explorerContent: ReactNode | null = null;

    React.Children.forEach(children, (child) => {
        if (React.isValidElement(child) && child.type === Explorer) {
            explorerContent = child.props.children;
        }
    });

    return (
        <>
            {/* Desktop View */}
            {!isMobileView && (
                <>
                    <div
                        className={cn(
                            "relative bg-muted/20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] transition-all duration-300",
                            isCollapsed ? "w-[72px]" : "w-60"
                        )}
                    >
                        <WorkspaceExplore>{explorerContent}</WorkspaceExplore>
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
                    {/* Main Content Area */}
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
                </>
            )}
            {/* Mobile View */}
            {isMobileView && (
                <>
                    <div className="flex-1">
                        <Outlet />
                    </div>
                    <MobileSidebar
                        isOpen={isMobileSidebarOpen}
                        onClose={() => setIsMobileSidebarOpen(false)}
                    >
                        <WorkspaceExplore>{explorerContent}</WorkspaceExplore>
                    </MobileSidebar>
                </>
            )}
        </>
    );
};

// Attach the Explorer component to WorkspaceFrame
WorkspaceFrame.Explorer = Explorer;
