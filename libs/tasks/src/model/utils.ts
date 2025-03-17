import { atom } from "jotai";

import { Task, TaskDto, tasks$ } from "./task";
import { DEFAULT_TASK_STATUS, taskStatuses$ } from "./task-status";

export const setTasksFromDtos = atom(null, (get, set, tasks: TaskDto[]) => {
    const buckets = get(buckets$);
    const goals = get(goals$);
    const statuses = get(taskStatuses$);

    set(tasks$, () => {
        const newTasks = tasks.map((t) => {
            const bucket = buckets.get(t.bucketId);
            const goal = goals.get(t.goalId);
            const status = statuses.get(t.statusId) || DEFAULT_TASK_STATUS;

            return {
                ...t,
                bucket,
                goal,
                status,
            } satisfies Task;
        });
        return newTasks;
    });
});
