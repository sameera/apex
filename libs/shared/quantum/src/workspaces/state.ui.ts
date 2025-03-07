import { ReactNode } from "react";
import { atom } from "jotai";

import { activeWorkspace$ } from "./state";

export const setWorkspaceMenu = atom(null, (get, set, menuNode: ReactNode) => {
    const activeWorkspace = get(activeWorkspace$);
    activeWorkspace.menu = menuNode;
});
