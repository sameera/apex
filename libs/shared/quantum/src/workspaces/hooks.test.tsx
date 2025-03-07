import { useNavigate } from "react-router-dom";
import { renderHook } from "@testing-library/react-hooks";
import { useAtom } from "jotai";
import { Mock, vi } from "vitest";

import { useNavigateOnSwitch } from "./workspace-switching";

vi.mock("jotai", () => ({
    useAtom: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
    useNavigate: vi.fn(),
}));

describe("useNavigateOnSwitch", () => {
    it("should navigate to the active workspace path", () => {
        const mockNavigate = vi.fn();
        const mockActiveWorkspace = { id: "workspace-1" };

        (useAtom as Mock).mockReturnValue([mockActiveWorkspace]);
        (useNavigate as Mock).mockReturnValue(mockNavigate);

        renderHook(() => useNavigateOnSwitch());

        expect(mockNavigate).toHaveBeenCalledWith("/workspace-1");
    });

    it("should navigate to the root path if no active workspace", () => {
        const mockNavigate = vi.fn();

        (useAtom as Mock).mockReturnValue([null]);
        (useNavigate as Mock).mockReturnValue(mockNavigate);

        renderHook(() => useNavigateOnSwitch());

        expect(mockNavigate).toHaveBeenCalledWith("/");
    });
});
