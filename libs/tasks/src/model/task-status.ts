import { atom } from "jotai";

export interface TaskStatus {
    id: number;
    name: string;
}

export const DEFAULT_TASK_STATUS: TaskStatus = {
    id: 0,
    name: "TODO",
};

export const taskStatuses$ = atom<Map<number, TaskStatus>>(
    new Map([[DEFAULT_TASK_STATUS.id, DEFAULT_TASK_STATUS]])
);

export const setTaskStatuses$ = atom(null, (_, set, statuses: TaskStatus[]) => {
    set(taskStatuses$, (prev) => {
        prev.clear();
        prev.set(DEFAULT_TASK_STATUS.id, DEFAULT_TASK_STATUS);

        statuses.forEach((status) => {
            prev.set(status.id, status);
        });
        return prev;
    });
});
