import { atom } from "jotai";

export interface Goal {
    id: string;
    name: string;
    description: string;
    startDate?: Date;
    dueDate?: Date;
    status: number;
}

export const goals$ = atom<Map<string, Goal>>(new Map<string, Goal>());

export const setGoals$ = atom(null, (_, set, goals: Goal[]) => {
    set(goals$, (prev) => {
        prev.clear();
        goals.forEach((goal) => {
            prev.set(goal.id, goal);
        });
        return prev;
    });
});

export const addGoal$ = atom(null, (_, set, goal: Goal) => {
    set(goals$, (prev) => prev.set(goal.id, goal));
});

export const updateGoal$ = atom(null, (_, set, goal: Goal) => {
    set(goals$, (prev) => {
        if (!prev.has(goal.id)) return prev;
        return prev.set(goal.id, goal);
    });
});
