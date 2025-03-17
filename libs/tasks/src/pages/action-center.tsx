import {
    CardItem,
    JiraCardDisplay,
    KanbanBoard,
} from "@sameera/quantum/ui/kanban-board";

const ActionCenter: React.FC = () => {
    const exampleData: CardItem[][][] = [
        [
            [
                {
                    id: "PROJ-1",
                    name: "Implement login functionality",
                    type: "task",
                    priority: "high",
                    status: "todo",
                    assignee: {
                        name: "John Doe",
                        initials: "JD",
                    },
                },
                {
                    id: "PROJ-2",
                    name: "Fix navigation bug in mobile view",
                    type: "bug",
                    priority: "highest",
                    status: "todo",
                    assignee: {
                        name: "Sarah Smith",
                        initials: "SS",
                    },
                },
            ],
            [
                {
                    id: "PROJ-3",
                    name: "Design user dashboard",
                    type: "story",
                    priority: "medium",
                    status: "in-progress",
                    assignee: {
                        name: "Mike Johnson",
                        initials: "MJ",
                    },
                },
            ],
            [
                {
                    id: "PROJ-4",
                    name: "Deploy to production",
                    type: "task",
                    priority: "medium",
                    status: "done",
                    assignee: {
                        name: "Lisa Brown",
                        initials: "LB",
                    },
                },
                {
                    id: "PROJ-5",
                    name: "Update documentation",
                    type: "task",
                    priority: "low",
                    status: "done",
                    assignee: {
                        name: "John Doe",
                        initials: "JD",
                    },
                },
            ],
        ],
        [
            [
                {
                    id: "PROJ-6",
                    name: "Research new API integration",
                    type: "story",
                    priority: "medium",
                    status: "todo",
                    assignee: {
                        name: "Sarah Smith",
                        initials: "SS",
                    },
                },
            ],
            [
                {
                    id: "PROJ-7",
                    name: "Implement dark mode",
                    type: "story",
                    priority: "low",
                    status: "in-progress",
                    assignee: {
                        name: "Mike Johnson",
                        initials: "MJ",
                    },
                },
                {
                    id: "PROJ-8",
                    name: "Fix performance issues",
                    type: "bug",
                    priority: "high",
                    status: "in-progress",
                    assignee: {
                        name: "Lisa Brown",
                        initials: "LB",
                    },
                },
            ],
            [],
        ],
        [
            [],
            [
                {
                    id: "PROJ-9",
                    name: "Redesign landing page",
                    type: "epic",
                    priority: "medium",
                    status: "in-progress",
                    assignee: {
                        name: "John Doe",
                        initials: "JD",
                    },
                },
            ],
            [
                {
                    id: "PROJ-10",
                    name: "Add analytics tracking",
                    type: "task",
                    priority: "medium",
                    status: "done",
                    assignee: {
                        name: "Sarah Smith",
                        initials: "SS",
                    },
                },
                {
                    id: "PROJ-11",
                    name: "User testing feedback implementation",
                    type: "story",
                    priority: "high",
                    status: "done",
                    assignee: {
                        name: "Mike Johnson",
                        initials: "MJ",
                    },
                },
            ],
        ],
    ];

    const columnHeaders = ["To Do", "In Progress", "Done"];
    const rowHeaders = ["High Priority", "Medium Priority", "Low Priority"];

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Action Center</h1>
            <KanbanBoard
                data={exampleData}
                columnHeaders={columnHeaders}
                rowHeaders={rowHeaders}
            />
        </div>
    );
};

export default ActionCenter;
