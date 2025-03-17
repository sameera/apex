import React, { ReactNode } from "react";
import { LuPlus, LuSettings } from "react-icons/lu";
import { useAtom } from "jotai";

import { ComponentWithChildren } from "../component-with-children";
import { Button } from "../components/button";
import { cn } from "../components/utils";
import { activeWorkspace$ } from "../workspaces/state";

import { isExplorerCollapsed$ } from "./state";

type WorkspaceExploreProps = React.HTMLAttributes<HTMLDivElement>;

export const Settings: ComponentWithChildren = () => {
    return null;
};

export const WorkspaceExplore: React.FC<WorkspaceExploreProps> & {
    Settings?: ComponentWithChildren;
} = ({ className, children }) => {
    const [activeWorkspace] = useAtom(activeWorkspace$);
    const [isCollapsed] = useAtom(isExplorerCollapsed$);

    let content: ReactNode | null = null;
    let settings: ReactNode | null = null;

    React.Children.forEach(children, (child) => {
        if (React.isValidElement(child) && child.type === Settings) {
            settings = child;
        } else {
            content = child;
        }
    });

    return (
        <div className={cn("flex flex-col h-full", className)}>
            <div className="flex-1 space-y-4 py-4 mb-8">
                <div className="space-y-4 px-3 py-2">
                    <div className="space-y-1 px-4 mb-6 gap-2 flex items-center">
                        <span>
                            {activeWorkspace.icon({
                                className: "mr-2 h-6 w-6",
                            })}
                        </span>
                        <h2
                            className={cn(
                                "text-lg font-semibold tracking-tight transition-all mb-2",
                                isCollapsed && "opacity-0"
                            )}
                        >
                            {activeWorkspace.name}
                        </h2>
                    </div>
                    {content}
                </div>
                <div className="px-3 py-2">
                    <div className="space-y-1">
                        <Button
                            variant="ghost"
                            className={cn(
                                "w-full justify-start",
                                isCollapsed && "px-2"
                            )}
                        >
                            <LuPlus
                                className={cn(
                                    "mr-2 h-4 w-4",
                                    isCollapsed && "mr-0 h-5 w-5"
                                )}
                            />
                            <span
                                className={cn(
                                    "transition-all",
                                    isCollapsed && "hidden"
                                )}
                            >
                                Add Channel
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
            <div className="px-3 py-4 border-t">
                {!settings && (
                    <Button
                        variant="ghost"
                        className={cn(
                            "w-full justify-start",
                            isCollapsed && "px-2"
                        )}
                    >
                        <LuSettings
                            className={cn(
                                "mr-2 h-4 w-4",
                                isCollapsed && "mr-0 h-5 w-5"
                            )}
                        />
                        <span
                            className={cn(
                                "transition-all",
                                isCollapsed && "hidden"
                            )}
                        >
                            Settings
                        </span>
                    </Button>
                )}
                {settings}
            </div>
        </div>
    );
};

WorkspaceExplore.Settings = Settings;
