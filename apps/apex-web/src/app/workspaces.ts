import { addWorkspaces$, Workspace } from "@sameera/quantum";
import { useSetAtom } from "jotai";
import { lazy } from "react";
import { BsCodeSlash } from "react-icons/bs";
import { GiSummits } from "react-icons/gi";
import { MdOutlineTaskAlt } from "react-icons/md";
import { SiGoogletasks } from "react-icons/si";

export const workspaces: Workspace[] = [
    // Tasks
    {
        id: "tasks",
        name: "Tasks",
        icon: MdOutlineTaskAlt,
        router: lazy(() => import("@sameera/apex/tasks/routes")),
    },
    // other
    {
        id: "overview",
        name: "Overview",
        icon: GiSummits,
    },
    {
        id: "programming",
        name: "Programming",
        icon: BsCodeSlash,
    },
    {
        id: "tasks",
        name: "Tasks",
        icon: SiGoogletasks,
    },
];

export function useAppWorkspaces() {
    const addWorkspaces = useSetAtom(addWorkspaces$);
    addWorkspaces(workspaces);
    return workspaces;
}
