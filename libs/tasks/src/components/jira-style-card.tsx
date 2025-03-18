import {
    LuCircleAlert,
    LuCircleCheck,
    LuClock,
    LuGripVertical,
} from "react-icons/lu";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@sameera/quantum/ui/avatar";
import { Badge } from "@sameera/quantum/ui/badge";
import { CardContent } from "@sameera/quantum/ui/card";
import { CardItem, CardTemplate } from "@sameera/quantum/ui/kanban-board";

export interface JiraCardItem extends CardItem {
    type?: "task" | "bug" | "story" | "epic";
    priority?: "highest" | "high" | "medium" | "low" | "lowest";
    status?: "todo" | "in-progress" | "done";
    assignee?: {
        name: string;
        avatar?: string;
        initials: string;
    };
}

// Get priority color
const getPriorityColor = (priority?: string) => {
    switch (priority) {
        case "highest":
            return "bg-red-500 dark:bg-red-600";
        case "high":
            return "bg-orange-500 dark:bg-orange-600";
        case "medium":
            return "bg-yellow-500 dark:bg-yellow-600";
        case "low":
            return "bg-blue-500 dark:bg-blue-600";
        case "lowest":
            return "bg-green-500 dark:bg-green-600";
        default:
            return "bg-gray-500 dark:bg-gray-600";
    }
};

// Get type badge
const getTypeBadge = (type?: string) => {
    switch (type) {
        case "bug":
            return (
                <Badge variant="destructive" className="text-xs">
                    Bug
                </Badge>
            );
        case "story":
            return (
                <Badge variant="secondary" className="text-xs">
                    Story
                </Badge>
            );
        case "epic":
            return (
                <Badge
                    variant="outline"
                    className="text-xs border-purple-500 text-purple-500 dark:text-purple-400"
                >
                    Epic
                </Badge>
            );
        case "task":
        default:
            return (
                <Badge variant="default" className="text-xs">
                    Task
                </Badge>
            );
    }
};

// Get status icon
const getStatusIcon = (status?: string) => {
    switch (status) {
        case "done":
            return (
                <LuCircleCheck className="h-4 w-4 text-green-500 dark:text-green-400" />
            );
        case "in-progress":
            return (
                <LuClock className="h-4 w-4 text-blue-500 dark:text-blue-400" />
            );
        case "todo":
        default:
            return (
                <LuCircleAlert className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            );
    }
};
export const JiraStyleCardTemplate: CardTemplate<JiraCardItem> = ({
    card,
    isDragOverlay,
}) => {
    const priorityColor = getPriorityColor(card.priority);

    return (
        <div className="flex h-full">
            {/* Change from top border to left border */}
            <div className={`w-1 ${priorityColor}`}></div>
            <CardContent className="p-3 flex-1">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                        <span className="text-xs font-mono text-muted-foreground">
                            {card.id}
                        </span>
                        {getTypeBadge(card.type)}
                    </div>
                    {!isDragOverlay && (
                        <div className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                            <LuGripVertical size={16} />
                        </div>
                    )}
                </div>

                <div className="font-medium mb-2 text-sm">{card.name}</div>

                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1">
                        {getStatusIcon(card.status)}
                    </div>

                    {card.assignee && (
                        <Avatar className="h-6 w-6">
                            {card.assignee.avatar ? (
                                <AvatarImage
                                    src={card.assignee.avatar}
                                    alt={card.assignee.name}
                                />
                            ) : null}
                            <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                {card.assignee.initials}
                            </AvatarFallback>
                        </Avatar>
                    )}
                </div>
            </CardContent>
        </div>
    );
};
