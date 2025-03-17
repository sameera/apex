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
import { Input } from "@sameera/quantum/ui/input";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@sameera/quantum/ui/drawer";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@sameera/quantum/ui/table";

import { Bucket } from "../model";

export default function BucketsPage() {
    // State for buckets
    const [buckets, setBuckets] = useState<Bucket[]>([
        {
            id: "1",
            name: "Errands",
            description: "Daily tasks and errands to run",
        },
        {
            id: "2",
            name: "Meetings",
            description: "Scheduled meetings and appointments",
        },
        {
            id: "3",
            name: "Brainstorm",
            description: "Ideas and creative thinking sessions",
        },
    ]);

    // State for new bucket
    const [newBucket, setNewBucket] = useState({ name: "", description: "" });

    // State for delete confirmation
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [bucketToDelete, setBucketToDelete] = useState<Bucket | null>(null);

    // State for drawer
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Handle input change for new bucket
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewBucket({ ...newBucket, [name]: value });
    };

    // Handle form submission
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (newBucket.name.trim() === "") return;

        const newId = Math.random().toString(36).substring(2, 9);
        setBuckets([...buckets, { id: newId, ...newBucket }]);
        setNewBucket({ name: "", description: "" });
        setIsDrawerOpen(false);
    };

    // Open delete confirmation dialog
    const openDeleteDialog = (bucket: Bucket) => {
        setBucketToDelete(bucket);
        setIsDeleteDialogOpen(true);
    };

    // Delete bucket after confirmation
    const confirmDelete = () => {
        if (bucketToDelete) {
            setBuckets(
                buckets.filter((bucket) => bucket.id !== bucketToDelete.id)
            );
        }
        setIsDeleteDialogOpen(false);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center">
                Manage Buckets
            </h1>
            {/* Buckets Table */}
            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-left">Name</TableHead>
                            <TableHead className="text-left">
                                Description
                            </TableHead>
                            <TableHead className="w-16"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {buckets.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={3}
                                    className="text-left py-8 text-gray-500"
                                >
                                    No buckets created yet. Add your first
                                    bucket.
                                </TableCell>
                            </TableRow>
                        ) : (
                            buckets.map((bucket) => (
                                <TableRow key={bucket.id}>
                                    <TableCell className="font-medium text-left">
                                        {bucket.name}
                                    </TableCell>
                                    <TableCell className="text-left whitespace-normal break-words max-w-md">
                                        {bucket.description}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                openDeleteDialog(bucket)
                                            }
                                            className="hover:bg-red-100 text-red-500"
                                            title="Delete Bucket"
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
                    title="Add Bucket"
                >
                    <LuPlus size={16} /> Add Bucket
                </Button>
                <Drawer open={isDrawerOpen} dismissible={false}>
                    <DrawerContent className="max-w-2xl mx-auto" hideHandle>
                        <DrawerHeader className="flex justify-between items-center">
                            <DrawerTitle>Add New Bucket</DrawerTitle>
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
                                    Name
                                </label>
                                <Input
                                    name="name"
                                    value={newBucket.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter bucket name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Description
                                </label>
                                <Input
                                    name="description"
                                    value={newBucket.description}
                                    onChange={handleInputChange}
                                    placeholder="Enter bucket description"
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Add Bucket
                            </Button>
                        </form>
                    </DrawerContent>
                </Drawer>
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                        <AlertDialogDescription className="text-left">
                            Are you sure you want to delete the bucket "
                            {bucketToDelete?.name}"? This action cannot be
                            undone.
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
