import React, { lazy } from "react";
import { IconType } from "react-icons";

export interface Workspace {
    id: string;
    name: string;
    icon: IconType;
}

export interface RoutableWorkspace extends Workspace {
    router?: ReturnType<typeof lazy>;
}

export interface RuntimeWorkspace extends RoutableWorkspace {
    menu?: React.ReactNode;
}
