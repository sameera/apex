import { addWorkspaces$ } from "@sameera/quantum";
import { useSetAtom } from "jotai";
import { BsCodeSlash } from "react-icons/bs";
import { GiSummits } from "react-icons/gi";
import { SiGoogletasks } from "react-icons/si";

export function useAppWorkspaces() {
    const addWorkspaces = useSetAtom(addWorkspaces$);

    const workspaces = [
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
    addWorkspaces(workspaces);

    return workspaces;
}
