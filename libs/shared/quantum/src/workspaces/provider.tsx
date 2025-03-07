import { ReactNode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSetAtom } from "jotai";

import { withSuspense } from "../hooks";

import { RoutableWorkspace } from "./model";
import { addWorkspaces$ } from "./state";

function createWorkspaceRouter(
    root: ReactNode,
    workspaces: RoutableWorkspace[]
) {
    return createBrowserRouter([
        {
            path: "/",
            element: root,
            children: workspaces.map((w) => ({
                path: `/${w.id}/*`,
                element: w.router ? withSuspense(w.router) : <p>Not found</p>,
            })),
        },
    ]);
}

export const WorkspaceProvider: React.FC<{
    workspaces: RoutableWorkspace[];
    children: ReactNode;
}> = ({ workspaces, children }) => {
    const addWorkspaces = useSetAtom(addWorkspaces$);
    addWorkspaces(workspaces);

    const router = createWorkspaceRouter(children, workspaces);
    return <RouterProvider router={router} />;
};
