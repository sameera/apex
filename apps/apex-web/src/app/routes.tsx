import { createBrowserRouter } from "react-router-dom";
import App from "./app";
import { withSuspense } from "@sameera/quantum";

import { workspaces } from "./workspaces";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: workspaces.map((w) => ({
            path: `/${w.id}/*`,
            element: w.router ? withSuspense(w.router) : <p>Not found</p>,
        })),
    },
]);
