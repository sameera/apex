import { useEffect } from "react";
import { AppFrame } from "@sameera/quantum";

import "@sameera/quantum/themes";

import { useWorkspacesInitializer } from "./workspaces";

export function App() {
    return <AppFrame></AppFrame>;
}

export default App;
