import { WorkspaceFrame } from "../layout";
import { ModeToggle } from "../layout/mode-toggle";

const SettingsPage: React.FC = () => {
    return (
        <WorkspaceFrame>
            <WorkspaceFrame.Explorer>
                <ModeToggle />
            </WorkspaceFrame.Explorer>
        </WorkspaceFrame>
    );
};

export default SettingsPage;
