import { LuPlus } from "react-icons/lu";
import { useAtom, useSetAtom } from "jotai";

import { Button } from "../components/button";
import { ScrollArea } from "../components/scroll-area";
import { Separator } from "../components/separator";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../components/tooltip";
import {
    activeWorkspace$,
    getWorkspaces$,
    systemWorkspace$,
    Workspace,
} from "../model";
import { cn } from "../utils";

type WorkspacesListProps = React.HTMLAttributes<HTMLDivElement>;

const ACTIVE_WORKSPACE_BUTTON =
    "w-full bg-primary/10 hover:bg-primary/20 group";
const INACTIVE_WORKSPACE_BUTTON = "w-full hover:bg-primary/10 group";
const ACTIVE_WORKSPACE_ICON = "h-4 w-4 text-primary";
const INACTIVE_WORKSPACE_ICON = "h-4 w-4 group-hover:text-primary";

function WorkspaceButton({
    workspace,
    activeWorkspace,
}: {
    workspace: Workspace;
    activeWorkspace?: Workspace;
}) {
    const setActiveWorkspace = useSetAtom(activeWorkspace$);
    const switchWorkspace = () => setActiveWorkspace(workspace.id);

    const isActive = workspace.id === activeWorkspace?.id;
    const buttonClassNames = isActive
        ? ACTIVE_WORKSPACE_BUTTON
        : INACTIVE_WORKSPACE_BUTTON;
    const iconClassNames = isActive
        ? ACTIVE_WORKSPACE_ICON
        : INACTIVE_WORKSPACE_ICON;

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className={buttonClassNames}
                    onClick={switchWorkspace}
                >
                    {workspace.icon({ className: iconClassNames })}
                </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
                <p>{workspace.name}</p>
            </TooltipContent>
        </Tooltip>
    );
}

export function WorkspacesList({ className }: WorkspacesListProps) {
    const [workspaces] = useAtom(getWorkspaces$);
    const [activeWorkspace] = useAtom(activeWorkspace$);
    const [appOverviewWorkspace] = useAtom(systemWorkspace$);

    return (
        <div className={cn("pb-12", className)}>
            <div className="space-y-1 py-4">
                {/* App Overview Button */}
                <div className="px-1 py-2">
                    <div className="space-y-1">
                        <TooltipProvider>
                            <WorkspaceButton
                                workspace={appOverviewWorkspace}
                                activeWorkspace={activeWorkspace}
                            />
                        </TooltipProvider>
                    </div>
                </div>
                {/* Workspace Buttons */}
                <div className="px-1 py-2">
                    <ScrollArea className="h-[300px] px-1">
                        <div className="space-y-1">
                            <TooltipProvider>
                                {workspaces.map((workspace) => (
                                    <WorkspaceButton
                                        key={workspace.id}
                                        workspace={workspace}
                                        activeWorkspace={activeWorkspace}
                                    />
                                ))}
                            </TooltipProvider>
                        </div>
                    </ScrollArea>
                </div>
                <div className="px-1 py-2">
                    <div className="space-y-1">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className={INACTIVE_WORKSPACE_BUTTON}
                                    >
                                        <LuPlus
                                            className={INACTIVE_WORKSPACE_ICON}
                                        />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p>Add Workspace</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
            </div>
            <Separator />
        </div>
    );
}
