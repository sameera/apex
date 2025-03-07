import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { withSuspense } from "@sameera/quantum";

const lzTaskFrame = lazy(() => import("./task-frame"));

export const WorkspaceMenu: React.FC = () => {
    return <h1>Task Menu</h1>;
};

export default function TasksRouter() {
    return (
        <Routes>
            <Route path="/" element={withSuspense(lzTaskFrame)} />
        </Routes>
    );
}
