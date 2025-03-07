import { ReactNode } from "react";
import { useSetAtom } from "jotai";

import { RoutableWorkspace } from "./model";
import { addWorkspaces$ } from "./state";

export const WorkspaceProvider: React.FC<{
    workspaces: RoutableWorkspace[];
    children: ReactNode;
}> = ({ workspaces, children }) => {
    const addWorkspaces = useSetAtom(addWorkspaces$);
    addWorkspaces(workspaces);

    return children;
};
