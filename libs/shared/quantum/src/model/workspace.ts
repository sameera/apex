import { atom } from "jotai";
import { IconType } from "react-icons";
import { appMeta$, DEFAULT_APP_ICON } from "./app-metadata";
import React from "react";

export interface Workspace {
    id: string;
    name: string;
    icon: IconType;
    explorerMenu?: React.ReactNode;
}

const _workspaces$ = atom(new Map<string, Workspace>());
const _activeWorkspace$ = atom<Workspace | null>(null);

export const systemWorkspace$ = atom((get) => {
    const appMeta = get(appMeta$);
    return {
        id: "<<APP_OVERVIEW_WORKSPACE>>",
        name: appMeta.name,
        icon: appMeta.icon,
    };
});

export const activeWorkspace$ = atom(
    (get) => {
        let active = get(_activeWorkspace$);
        if (active) return active;

        const wks = get(_workspaces$);
        if (wks.size > 0) {
            active = wks.values().next().value || null;
        }

        if (!active) {
            active = get(systemWorkspace$);
        }

        return active;
    },
    (get, set, workspaceId: string) => {
        const isEmptyId = !workspaceId || !workspaceId.length;

        const match = isEmptyId
            ? null
            : get(_workspaces$).get(workspaceId) || null;
        set(_activeWorkspace$, match);
    }
);

export const addWorkspaces$ = atom(null, (_, set, workspaces: Workspace[]) => {
    set(_workspaces$, (prev) => {
        workspaces.forEach((workspace) => {
            prev.set(workspace.id, workspace);
        });
        return prev;
    });
});

export const getWorkspaces$ = atom((get) =>
    Array.from(get(_workspaces$).values())
);

export const getWorkspaceByName$ = atom((get) => {
    return (name: string) => {
        const workspaces = get(_workspaces$);
        return workspaces.get(name);
    };
});

export const getWorkspacesByType$ = atom((get) => {
    const workspaces = get(getWorkspaces$);
    const [pluginSpaces, systemSpaces] = workspaces.reduce(
        (result, w) => {
            const [pluginSpaces, systemSpaces] = result;
            const targetList = w.isSystemSpace ? systemSpaces : pluginSpaces;
            targetList.push(w);
            return result;
        },
        [[], []] as [Workspace[], Workspace[]]
    );
    return { pluginSpaces, systemSpaces };
});
