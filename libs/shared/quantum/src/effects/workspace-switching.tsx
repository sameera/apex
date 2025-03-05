import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";

import { activeWorkspace$ } from "../model";

export const useNavigateOnSwitch = () => {
    const [activeWorkspace] = useAtom(activeWorkspace$);
    const navigate = useNavigate();

    useEffect(() => {
        navigate(activeWorkspace ? "/" + activeWorkspace.id : "/");
    }, [activeWorkspace, navigate]);
};
