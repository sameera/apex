import { atom } from "jotai";

export interface AppMetadata {
    name: string;
}

export const appMeta$ = atom<AppMetadata>({ name: "Aetherium App" });
