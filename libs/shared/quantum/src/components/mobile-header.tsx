import { Code2, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";

interface MobileHeaderProps {
    onOpenSidebar: () => void;
}

export function MobileHeader({ onOpenSidebar }: MobileHeaderProps) {
    return (
        <header className="flex h-14 items-center justify-between border-b px-4 lg:hidden">
            <div className="flex items-center gap-3">
                <Code2 className="h-6 w-6" />
                <h1 className="text-lg font-semibold">Engineering</h1>
            </div>
            <div className="flex items-center gap-2">
                <ModeToggle />
                <Button variant="ghost" size="icon" onClick={onOpenSidebar}>
                    <Menu className="h-5 w-5" />
                </Button>
            </div>
        </header>
    );
}
