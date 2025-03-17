import React from "react";
import { IconType } from "react-icons";
import { useNavigate } from "react-router-dom";
import { useAtom, useSetAtom } from "jotai";

import { Button } from "../components/button";
import { cn } from "../components/utils";

import { isExplorerCollapsed$, isMobileSidebarOpen$ } from "./state";

/**
 * Props for the WorkspaceMenuItem component.
 *
 * @property {IconType} icon - The icon to be displayed in the menu item.
 * @property {string} text - The text to be displayed in the menu item.
 * @property {string} [to] - The optional URL to navigate to when the menu item is clicked.
 * @property {() => void} [onClick] - The optional click handler function to be executed when the menu item is clicked.
 *
 * @remarks
 * Both `to` and `onClick` can be specified together. The `onClick` handler will run prior to navigation, allowing the handler to perform any necessary actions before navigating.
 */
export interface WorkspaceMenuItemProps {
    icon: IconType;
    text: string;
    to?: string;
    onClick?: () => void;
}

export const WorkspaceMenuItem: React.FC<WorkspaceMenuItemProps> = ({
    icon,
    text,
    to,
    onClick,
}) => {
    const navigate = useNavigate();
    const [isCollapsed] = useAtom(isExplorerCollapsed$);
    const setIsMobileSidebarOpen = useSetAtom(isMobileSidebarOpen$);

    const onItemClicked = () => {
        if (onClick) onClick();
        if (to) navigate(to);
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
