import React from "react";
import { IconType } from "react-icons";
import { useAtom } from "jotai";

import { Button } from "../components/button";
import { cn } from "../components/utils";

import { isExplorerCollapsed$ } from "./state";

export const WorkspaceMenuItem: React.FC<{
    icon: IconType;
    text: string;
}> = ({ icon, text }) => {
    const [isCollapsed] = useAtom(isExplorerCollapsed$);

    return (
        <Button
            variant="ghost"
            className={cn(
                "w-full justify-start",
                isCollapsed && "px-2 justify-center"
            )}
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
