import React from "react";
import { LuHash, LuMegaphone, LuMessagesSquare } from "react-icons/lu";
import { WorkspaceFrame, WorkspaceMenuItem } from "@sameera/quantum";

const TaskFrame: React.FC = () => {
    return (
        <WorkspaceFrame>
            <WorkspaceFrame.Explorer>
                <div className="space-y-1">
                    <WorkspaceMenuItem
                        text="Announcements"
                        icon={LuMegaphone}
                    />
                    <WorkspaceMenuItem text="general" icon={LuHash} />
                    <WorkspaceMenuItem text="chat" icon={LuMessagesSquare} />
                </div>
            </WorkspaceFrame.Explorer>
        </WorkspaceFrame>
    );
};

export default TaskFrame;
