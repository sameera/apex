import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { withSuspense } from "@sameera/quantum";

const lzTaskFrame = lazy(() => import("./task-frame"));
const lzActionCenter = lazy(() => import("./pages/action-center"));
const lzBucketsPage = lazy(() => import("./pages/buckets-page"));
const lzGoalsPage = lazy(() => import("./pages/goals-page"));

export const WorkspaceMenu: React.FC = () => {
    return <h1>Task Menu</h1>;
};

export default function TasksRouter() {
    return (
        <Routes>
            <Route path="/" element={withSuspense(lzTaskFrame)}>
                <Route index element={withSuspense(lzActionCenter)} />
                <Route path="goals" element={withSuspense(lzGoalsPage)} />
                <Route path="buckets" element={withSuspense(lzBucketsPage)} />
            </Route>
        </Routes>
    );
}
