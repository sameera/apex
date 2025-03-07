import React from "react";
import { IconType } from "react-icons";
import { useAtom, useSetAtom } from "jotai";

import { Button } from "../components/button";
import { cn } from "../components/utils";

import { isExplorerCollapsed$, isMobileSidebarOpen$ } from "./state";

export const WorkspaceMenuItem: React.FC<{
    icon: IconType;
    text: string;
    onClick?: () => void;
}> = ({ icon, text, onClick }) => {
    const [isCollapsed] = useAtom(isExplorerCollapsed$);
    const setIsMobileSidebarOpen = useSetAtom(isMobileSidebarOpen$);

    const onItemClicked = () => {
        if (onClick) onClick();
        setIsMobileSidebarOpen(false);
    };

    return (
        <Button
            variant="ghost"
            className={cn(
                "w-full justify-start",
                isCollapsed && "px-2 justify-center"
            )}
            onClick={onItemClicked}
        >
            {icon({
                className: cn("mr-2 h-4 w-4", isCollapsed && "mr-0 h-5 w-5"),
            })}
            <span className={cn("transition-all", isCollapsed && "hidden")}>
                {text}
            </span>
        </Button>
    );
};
