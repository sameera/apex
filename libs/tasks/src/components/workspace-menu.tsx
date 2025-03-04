import { WorkspaceMenuItem } from "@sameera/quantum";
import React from "react";
import { BsKanbanFill } from "react-icons/bs";

export const WorkspaceMenu: React.FC = () => {
    return (
        <div className="space-y-1">
            <WorkspaceMenuItem text="Action Center" icon={BsKanbanFill} />
        </div>
    );
};
