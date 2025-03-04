import { Route, Routes, Link } from "react-router-dom";

import { AppFrame } from "@sameera/quantum";
import "@sameera/quantum/themes";
import { useAppWorkspaces } from "./workspaces";

export function App() {
    useAppWorkspaces();

    return <AppFrame></AppFrame>;
}

export default App;
