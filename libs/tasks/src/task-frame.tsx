import React from "react";
import { LuClapperboard, LuGoal, LuShoppingBag } from "react-icons/lu";
import { WorkspaceFrame, WorkspaceMenuItem } from "@sameera/quantum";

const TaskFrame: React.FC = () => {
    return (
        <WorkspaceFrame>
            <WorkspaceFrame.Explorer>
                <div className="space-y-1">
                    <WorkspaceMenuItem
                        text="Action Center"
                        icon={LuClapperboard}
                        to="/tasks"
                    />
                    <WorkspaceMenuItem
                        text="Buckets"
                        icon={LuShoppingBag}
                        to="buckets"
                    />
                    <WorkspaceMenuItem text="Goals" icon={LuGoal} to="goals" />
                </div>
            </WorkspaceFrame.Explorer>
        </WorkspaceFrame>
    );
};

export default TaskFrame;
