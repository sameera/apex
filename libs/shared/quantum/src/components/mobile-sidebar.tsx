import { Sheet, SheetContent } from "./ui/sheet";
import { WorkspaceExplore } from "./workspace-explore";

interface MobileSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent side="left" className="w-[280px] p-0">
                <WorkspaceExplore className="h-full" isCollapsed={false} />
            </SheetContent>
        </Sheet>
    );
}
