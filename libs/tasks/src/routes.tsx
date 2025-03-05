import { withSuspense } from "@sameera/quantum";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const lzActionCenter = lazy(() => import("./pages/action-center"));

export default function TasksRouter() {
    return (
        <Routes>
            <Route path="/" element={withSuspense(lzActionCenter)} />
        </Routes>
    );
}
