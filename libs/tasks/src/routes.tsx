import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { withSuspense } from "@sameera/quantum";

const lzActionCenter = lazy(() => import("./pages/action-center"));

export const WorkspaceMenu: React.FC = () => {
    return <h1>Task Menu</h1>;
};

export default function TasksRouter() {
    return (
        <Routes>
            <Route path="/" element={withSuspense(lzActionCenter)} />
        </Routes>
    );
}
