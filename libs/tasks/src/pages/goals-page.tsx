import React, { useState } from "react";
import { LuPlus, LuTrash, LuX } from "react-icons/lu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@sameera/quantum/ui/alert-dialog";
import { Button } from "@sameera/quantum/ui/button";
import { Calendar } from "@sameera/quantum/ui/calendar";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@sameera/quantum/ui/drawer";
import { Input } from "@sameera/quantum/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@sameera/quantum/ui/popover";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@sameera/quantum/ui/table";
import { format } from "date-fns";
import { useAtom } from "jotai";

import { Goal, goals$ } from "../model";
export default function GoalsPage() {
    const [goals, setGoals] = useAtom(goals$);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [goalToDelete, setGoalToDelete] = useState<Goal | null>(null);
    const [startDate, setStartDate] = useState<Date>();
    const [dueDate, setDueDate] = useState<Date>();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const locale: Intl.LocalesArgument = "en-US";
    const dateFormatOptions: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric",
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const newGoal = {
            id: Date.now().toString(36),
            name: formData.get("title") as string,
            description: formData.get("description") as string,
            status: 0,
            startDate,
            dueDate,
        };
        goals.set(newGoal.id, newGoal);
        setGoals(goals);
        setIsDrawerOpen(false);
    };

    const openDeleteDialog = (goal: Goal) => {
        setGoalToDelete(goal);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (goalToDelete) {
            goals.delete(goalToDelete.id);
            setGoals(goals);
        }
        setIsDeleteDialogOpen(false);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center">
                Manage Goals
            </h1>
            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-left">Title</TableHead>
                            <TableHead className="text-left">
                                Description
                            </TableHead>
                            <TableHead className="text-left">Status</TableHead>
                            <TableHead className="text-left">
                                Start Date
                            </TableHead>
                            <TableHead className="text-left">
                                Due Date
                            </TableHead>
                            <TableHead className="w-16"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {goals.size === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={3}
                                    className="text-center py-8 text-gray-500"
                                >
                                    No goals created yet. Add your first goal.
                                </TableCell>
                            </TableRow>
                        ) : (
                            Array.from(goals, ([goalId, goal]) => (
                                <TableRow key={goalId}>
                                    <TableCell className="font-medium text-left">
                                        {goal.name}
                                    </TableCell>
                                    <TableCell className="text-left whitespace-normal break-words max-w-md">
                                        {goal.description}
                                    </TableCell>
                                    <TableCell className="text-left">
                                        {goal.status}
                                    </TableCell>
                                    <TableCell className="text-left">
                                        {goal.startDate?.toLocaleString(
                                            locale,
                                            dateFormatOptions
                                        ) || ""}
                                    </TableCell>
                                    <TableCell className="text-left">
                                        {goal.dueDate?.toLocaleDateString(
                                            locale,
                                            dateFormatOptions
                                        ) || ""}
                                    </TableCell>

                                    <TableCell>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                openDeleteDialog(goal)
                                            }
                                            className="hover:bg-red-100 text-red-500"
                                            title="Delete Goal"
                                        >
                                            <LuTrash size={16} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="mt-12 flex justify-end">
                <Button
                    onClick={() => setIsDrawerOpen(true)}
                    className="flex items-center gap-1"
                    title="Add Goal"
                >
                    <LuPlus size={16} /> Add Goal
                </Button>
                <Drawer open={isDrawerOpen} dismissible={false}>
                    <DrawerContent className="max-w-2xl mx-auto" hideHandle>
                        <DrawerHeader className="flex justify-between items-center">
                            <DrawerTitle>Add New Goal</DrawerTitle>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsDrawerOpen(false)}
                            >
                                <LuX size={16} />
                            </Button>
                        </DrawerHeader>
                        <form
                            onSubmit={handleFormSubmit}
                            className="space-y-4 p-4"
                        >
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Title
                                </label>
                                <Input
                                    name="title"
                                    placeholder="Enter goal title"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Description
                                </label>
                                <Input
                                    name="description"
                                    placeholder="Enter goal description"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Start Date
                                </label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start text-left font-normal"
                                        >
                                            {startDate
                                                ? format(startDate, "PPP")
                                                : "Pick a date"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={startDate}
                                            onSelect={setStartDate}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Due Date
                                </label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start text-left font-normal"
                                        >
                                            {dueDate
                                                ? format(dueDate, "PPP")
                                                : "Pick a date"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={dueDate}
                                            onSelect={setDueDate}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <Button type="submit" className="w-full">
                                Add Goal
                            </Button>
                        </form>
                    </DrawerContent>
                </Drawer>
            </div>

            <AlertDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                        <AlertDialogDescription className="text-left">
                            Are you sure you want to delete the goal "
                            {goalToDelete?.name}"? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDelete}
                            className="bg-red-500 hover:bg-red-600"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
