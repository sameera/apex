import { workspaceRoot } from "@nx/devkit";
import path from "path";
import { defineConfig } from "vite";

export function createBaseViteConfig() {
    return defineConfig({
        resolve: {
            alias: {
                "@sameera/quantum/ui/": path.resolve(
                    workspaceRoot,
                    "libs/shared/quantum/src/components/"
                ),
            },
        },
    });
}
