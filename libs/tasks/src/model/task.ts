import { atom } from "jotai";

import { Bucket } from "./bucket";
import { Goal } from "./goal";
import { TaskStatus } from "./task-status";

export interface Task {
    id: string;
    name: string;
    description?: string;
    startDate?: Date;
    dueDate?: Date;
    estimatedDurationInDays?: number;
    priority?: number;
    status?: TaskStatus;
    recurrence?: string;
    bucket?: Bucket;
    goal?: Goal;
}

export type TaskDto = Omit<Task, "bucket" | "goal" | "status"> & {
    bucketId: string;
    goalId: string;
    statusId: number;
};

export const tasks$ = atom<Task[]>([]);

export const addTask$ = atom(null, (_, set, task: Task) => {
    set(tasks$, (prev) => [...prev, task]);
});

export const updateTask$ = atom(null, (_, set, task: Task) => {
    set(tasks$, (prev) => {
        const idx = prev.findIndex((t) => t.id === task.id);
        if (idx === -1) return prev;
        prev[idx] = task;
        return prev;
    });
});

export const deleteTask$ = atom(null, (_, set, taskId: string) => {
    set(tasks$, (prev) => prev.filter((t) => t.id !== taskId));
});
