import { useAtom } from "jotai";
import { cn } from "../utils";
import { Button } from "./ui/button";
import {
    LuHash,
    LuMegaphone,
    LuMessagesSquare,
    LuPlus,
    LuSettings,
} from "react-icons/lu";
import { activeWorkspace$ } from "../model";
import { WorkspaceExplorerButton } from "./workspace-explorer-button";

interface WorkspaceExploreProps extends React.HTMLAttributes<HTMLDivElement> {
    isCollapsed: boolean;
}

export function WorkspaceExplore({
    className,
    isCollapsed,
}: WorkspaceExploreProps) {
    const [activeWorkspace] = useAtom(activeWorkspace$);

    return (
        <div className={cn("flex flex-col h-full", className)}>
            <div className="flex-1 space-y-4 py-4 mb-8">
                <div className="space-y-4 px-3 py-2">
                    <div className="space-y-1 px-4 gap-2 flex items-center">
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
                    <div className="space-y-1 pt-3">
                        <WorkspaceExplorerButton
                            isCollapsed={isCollapsed}
                            text="Announcements"
                            icon={LuMegaphone}
                        />
                        <WorkspaceExplorerButton
                            isCollapsed={isCollapsed}
                            text="general"
                            icon={LuHash}
                        />
                        <WorkspaceExplorerButton
                            isCollapsed={isCollapsed}
                            text="chat"
                            icon={LuMessagesSquare}
                        />
                    </div>
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
            </div>
        </div>
    );
}
