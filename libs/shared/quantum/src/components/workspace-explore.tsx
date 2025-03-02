import { cn } from "../utils";
import { Button } from "./ui/button";
import { Hash, Megaphone, MessageSquare, Plus, Settings } from "lucide-react";

interface WorkspaceExploreProps extends React.HTMLAttributes<HTMLDivElement> {
    isCollapsed: boolean;
}

export function WorkspaceExplore({
    className,
    isCollapsed,
}: WorkspaceExploreProps) {
    return (
        <div className={cn("flex flex-col h-full", className)}>
            <div className="flex-1 space-y-4 py-4">
                <div className="px-3 py-2">
                    <h2
                        className={cn(
                            "px-4 text-lg font-semibold tracking-tight transition-all mb-2",
                            isCollapsed && "opacity-0"
                        )}
                    >
                        Engineering
                    </h2>
                    <div className="space-y-1">
                        <Button
                            variant="ghost"
                            className={cn(
                                "w-full justify-start",
                                isCollapsed && "px-2"
                            )}
                        >
                            <Megaphone
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
                                Announcements
                            </span>
                        </Button>
                        <Button
                            variant="ghost"
                            className={cn(
                                "w-full justify-start",
                                isCollapsed && "px-2"
                            )}
                        >
                            <Hash
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
                                general
                            </span>
                        </Button>
                        <Button
                            variant="ghost"
                            className={cn(
                                "w-full justify-start",
                                isCollapsed && "px-2"
                            )}
                        >
                            <MessageSquare
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
                                chat
                            </span>
                        </Button>
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
                            <Plus
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
                    <Settings
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
