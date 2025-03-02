import React, { useState } from "react";
import { ThemeProvider } from "./components/theme-provider";
import { WorkspacesList } from "./components/workspaces-list";
import { WorkspaceExplore } from "./components/workspace-explore";
import { Chat } from "./components/chat";
import { ModeToggle } from "./components/mode-toggle";
import { Button } from "./components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "./utils";
import { MobileHeader } from "./components/mobile-header";
import { MobileSidebar } from "./components/mobile-sidebar";

import "./app-frame.css";

export const AppFrame: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    return (
        <ThemeProvider defaultTheme="dark">
            <div className="flex h-screen">
                {/* Desktop Layout */}
                <div className="hidden lg:flex h-full w-full">
                    {/* Workspace List */}
                    <div className="w-[72px] border-r bg-muted/50">
                        <WorkspacesList />
                    </div>

                    {/* Workspace Explore (Collapsible) */}
                    <div
                        className={cn(
                            "relative border-r transition-all duration-300",
                            isCollapsed ? "w-[72px]" : "w-60"
                        )}
                    >
                        <WorkspaceExplore isCollapsed={isCollapsed} />
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute -right-3 top-3 z-10 h-6 w-6 rounded-full bg-background"
                            onClick={() => setIsCollapsed(!isCollapsed)}
                        >
                            {isCollapsed ? (
                                <ChevronRight className="h-4 w-4" />
                            ) : (
                                <ChevronLeft className="h-4 w-4" />
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
                            <Chat />
                        </div>
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="flex flex-col h-full w-full lg:hidden">
                    <MobileHeader
                        onOpenSidebar={() => setIsMobileSidebarOpen(true)}
                    />
                    <div className="flex-1">
                        <Chat />
                    </div>
                    <MobileSidebar
                        isOpen={isMobileSidebarOpen}
                        onClose={() => setIsMobileSidebarOpen(false)}
                    />
                </div>
            </div>
        </ThemeProvider>
    );
};
