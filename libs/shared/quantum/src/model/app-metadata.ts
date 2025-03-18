import { IconType } from "react-icons";
import { LiaAtomSolid } from "react-icons/lia";
import { atom } from "jotai";

export const DEFAULT_APP_ICON = LiaAtomSolid;

export interface AppMetadata {
    name: string;
    icon: IconType;
}

export const appMeta$ = atom<AppMetadata>({
    name: "Quantum App",
    icon: DEFAULT_APP_ICON,
});
