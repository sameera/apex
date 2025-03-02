import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Send } from "lucide-react";

export function Chat() {
    return (
        <div className="flex h-full flex-col">
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                    {/* Chat messages would go here */}
                    <div className="text-center text-sm text-muted-foreground">
                        No messages yet. Start the conversation!
                    </div>
                </div>
            </ScrollArea>
            <div className="border-t p-4">
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="flex items-center gap-2"
                >
                    <Input placeholder="Type a message..." className="flex-1" />
                    <Button type="submit" size="icon">
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
            </div>
        </div>
    );
}
