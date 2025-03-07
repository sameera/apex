import { ReactNode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAtom } from "jotai";

import { withSuspense } from "../hooks";

import { RoutableWorkspace } from "./model";
import { getWorkspaces$ } from "./state";

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

export const WorkspaceRouterProvider: React.FC<{
    children: ReactNode;
}> = ({ children }) => {
    const [workspaces] = useAtom(getWorkspaces$);
    const router = createWorkspaceRouter(children, workspaces);

    return <RouterProvider router={router} />;
};
