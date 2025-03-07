import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { WorkspaceProvider, WorkspaceRouterProvider } from "@sameera/quantum";

import App from "./app/app";
import { workspaces } from "./app/workspaces";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <StrictMode>
        <WorkspaceProvider workspaces={workspaces}>
            <App />
        </WorkspaceProvider>
    </StrictMode>
);
