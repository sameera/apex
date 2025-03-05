import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export function Loader() {
    return <div>Loading...</div>;
}

export const withSuspense = (
    Component: React.LazyExoticComponent<React.ComponentType<any>>
) => (
    <ErrorBoundary fallback={<div>Error loading component</div>}>
        <Suspense fallback={<Loader />}>
            <Component />
        </Suspense>
    </ErrorBoundary>
);
