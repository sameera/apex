import React from "react";
import { Button } from "./ui/button";
import { cn } from "../utils";
import { IconType } from "react-icons";

export const WorkspaceExplorerButton: React.FC<{
    icon: IconType;
    text: string;
    isCollapsed: boolean;
}> = ({ icon, text, isCollapsed }) => {
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
