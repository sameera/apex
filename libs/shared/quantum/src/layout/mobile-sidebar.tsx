import { ReactNode } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
} from "../components/sheet";

import { WorkspaceExplore } from "./workspace-explore";

interface MobileSidebarProps {
    children?: ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

export function MobileSidebar({
    children,
    isOpen,
    onClose,
}: MobileSidebarProps) {
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent side="left" className="w-[280px] p-0">
                <SheetTitle className="sr-only">Workspace Explorer</SheetTitle>
                <SheetDescription className="sr-only">
                    Navigate through your workspace items and folders
                </SheetDescription>
                {children}
            </SheetContent>
        </Sheet>
    );
}
