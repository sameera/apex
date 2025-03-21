import { LuMenu } from "react-icons/lu";

import { Button } from "../components/button";
import { Workspace } from "../workspaces";

import { ModeToggle } from "./mode-toggle";

interface MobileHeaderProps {
    onOpenSidebar: () => void;
    workspace: Workspace;
}

export function MobileHeader({ onOpenSidebar, workspace }: MobileHeaderProps) {
    return (
        <header className="flex h-14 items-center justify-between border-b px-4 lg:hidden">
            <div className="flex items-center gap-3">
                {workspace.icon({ className: "h-6 w-6" })}
                <h1 className="text-lg font-semibold">{workspace.name}</h1>
            </div>
            <div className="flex items-center gap-2">
                <ModeToggle />
                <Button variant="ghost" size="icon" onClick={onOpenSidebar}>
                    <LuMenu className="h-5 w-5" />
                </Button>
            </div>
        </header>
    );
}
