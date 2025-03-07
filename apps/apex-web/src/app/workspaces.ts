/* eslint-disable @typescript-eslint/no-unused-vars */
import { lazy, ReactNode } from "react";
import { BsCodeSlash } from "react-icons/bs";
import { GiRubberBoot, GiSummits } from "react-icons/gi";
import { MdOutlineTaskAlt } from "react-icons/md";
import { SiGoogletasks } from "react-icons/si";
import {
    addWorkspaces$,
    createWorkspaceRouter,
    RoutableWorkpace,
    Workspace,
} from "@sameera/quantum";
import { useSetAtom } from "jotai";

export const workspaces: RoutableWorkpace[] = [
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
