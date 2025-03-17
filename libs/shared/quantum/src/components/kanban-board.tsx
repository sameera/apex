import { useEffect, useRef, useState } from "react";
import React from "react";
import {
    closestCenter,
    DndContext,
    type DragEndEvent,
    DragOverlay,
    type DragStartEvent,
    MouseSensor,
    TouchSensor,
    useDroppable,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Card } from "./card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./table";

// Define the type for a card item
export interface CardItem {
    id: string;
    name: string;
    [key: string]: unknown;
}

// Props for the KanbanCard component
interface KanbanCardProps<T extends CardItem = CardItem> {
    card: T;
    isDragOverlay?: boolean;
}

export type CardTemplate<T extends CardItem = CardItem> = React.FC<
    KanbanCardProps<T>
>;

// Props for the KanbanBoard component
interface KanbanBoardProps {
    data: CardItem[][][];
    columnHeaders?: string[];
    rowHeaders?: string[];
    cardTemplate?: CardTemplate;
}

// Card content component (shared between draggable card and overlay)
const CardDisplay: React.FC<KanbanCardProps> = ({ card, isDragOverlay }) => {
    return <div className="font-medium mb-2 text-sm">{card.name}</div>;
};

// The draggable card component
const KanbanCard: React.FC<
    KanbanCardProps & { id: string; cardTemplate: React.FC<{ card: CardItem }> }
> = ({ card, id, cardTemplate }) => {
    const cardRef = useRef<HTMLDivElement | null>(null);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id,
        transition: {
            duration: 300,
            easing: "cubic-bezier(0.2, 0, 0, 1)",
        },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition || "transform 300ms cubic-bezier(0.2, 0, 0, 1)",
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 1 : 0,
    };

    return (
        <Card
            ref={(node) => {
                setNodeRef(node);
                if (node) {
                    cardRef.current = node;
                }
            }}
            style={style}
            className="mb-3 cursor-move border border-border hover:shadow-md transition-shadow duration-200 overflow-hidden group"
            data-card-width={cardRef.current?.offsetWidth}
        >
            <div {...attributes} {...listeners} className="w-full h-full">
                {cardTemplate({ card })}
            </div>
        </Card>
    );
};

// Drop indicator component
const DropIndicator = () => (
    <div className="h-1 w-full bg-primary rounded-full my-1 animate-pulse" />
);

// Empty cell droppable area component
const EmptyCell = ({
    rowIndex,
    colIndex,
}: {
    rowIndex: number;
    colIndex: number;
}) => {
    const { setNodeRef, isOver } = useDroppable({
        id: `empty-${rowIndex}-${colIndex}`,
        data: {
            rowIndex,
            colIndex,
            isEmpty: true,
        },
    });

    return (
        <div
            ref={setNodeRef}
            className={`min-h-[60px] w-full rounded-md transition-colors ${
                isOver ? "bg-primary/10" : "bg-muted/30 dark:bg-muted/10"
            }`}
        >
            {isOver && <DropIndicator />}
        </div>
    );
};

// The main Kanban board component
export const KanbanBoard: React.FC<KanbanBoardProps> = ({
    data,
    columnHeaders = [],
    rowHeaders = [],
    cardTemplate = CardDisplay,
}) => {
    // State to track the board data
    const [boardData, setBoardData] = useState<CardItem[][][]>(data);

    // State to track card positions for animation
    const [cardPositions, setCardPositions] = useState<
        Map<string, { rowIndex: number; colIndex: number; cardIndex: number }>
    >(new Map());

    // State to track the currently dragged item
    const [activeCard, setActiveCard] = useState<CardItem | null>(null);
    const [activeCardPosition, setActiveCardPosition] = useState<{
        rowIndex: number;
        colIndex: number;
        cardIndex: number;
    } | null>(null);
    const [overPosition, setOverPosition] = useState<{
        rowIndex: number;
        colIndex: number;
        cardIndex: number;
        isEmpty?: boolean;
    } | null>(null);

    // State to track the width of the cards for consistent drag overlay
    const [cardWidth, setCardWidth] = useState<number | null>(null);

    // Update card positions map when board data changes
    useEffect(() => {
        const newPositions = new Map<
            string,
            { rowIndex: number; colIndex: number; cardIndex: number }
        >();

        boardData.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                cell.forEach((card, cardIndex) => {
                    newPositions.set(card.id, {
                        rowIndex,
                        colIndex,
                        cardIndex,
                    });
                });
            });
        });

        setCardPositions(newPositions);
    }, [boardData]);

    // Configure sensors for drag and drop
    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 5,
            },
        })
    );

    // Handle drag start
    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        const idParts = active.id.toString().split("-");

        // Only process if it's a card (not an empty cell)
        if (idParts[0] !== "empty") {
            const [rowIndex, colIndex, cardIndex] = idParts.map(Number);
            setActiveCard(boardData[rowIndex][colIndex][cardIndex]);
            setActiveCardPosition({ rowIndex, colIndex, cardIndex });

            // Get the width of the card being dragged
            const cardElement = document.querySelector(
                `[data-card-id="${active.id}"]`
            ) as HTMLElement;
            if (cardElement) {
                setCardWidth(cardElement.offsetWidth);
            } else {
                // Fallback to a reasonable width if we can't find the element
                setCardWidth(250);
            }
        }
    };

    // Handle drag over
    const handleDragOver = (event: any) => {
        const { over } = event;

        if (!over) {
            setOverPosition(null);
            return;
        }

        const overId = over.id.toString();

        // Check if we're over an empty cell
        if (overId.startsWith("empty")) {
            const [_, rowIndex, colIndex] = overId.split("-").map(Number);
            setOverPosition({
                rowIndex,
                colIndex,
                cardIndex: 0, // Default to beginning of the cell
                isEmpty: true,
            });
        } else {
            const [overRowIndex, overColIndex, overCardIndex] = overId
                .split("-")
                .map(Number);
            setOverPosition({
                rowIndex: overRowIndex,
                colIndex: overColIndex,
                cardIndex: overCardIndex,
                isEmpty: false,
            });
        }
    };

    // Handle drag end
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || !activeCardPosition) {
            setActiveCard(null);
            setActiveCardPosition(null);
            setOverPosition(null);
            setCardWidth(null);
            return;
        }

        const [activeRowIndex, activeColIndex, activeCardIndex] = active.id
            .toString()
            .split("-")
            .map(Number);

        // Create a new board data to avoid mutating the state directly
        const newBoardData = [
            ...boardData.map((row) => [...row.map((col) => [...col])]),
        ];

        // Get the card being moved
        const movedCard = {
            ...newBoardData[activeRowIndex][activeColIndex][activeCardIndex],
        };

        // Remove from the source
        newBoardData[activeRowIndex][activeColIndex].splice(activeCardIndex, 1);

        // Handle drop on empty cell
        if (over.id.toString().startsWith("empty")) {
            const [_, overRowIndex, overColIndex] = over.id
                .toString()
                .split("-")
                .map(Number);

            // Add to the empty cell
            newBoardData[overRowIndex][overColIndex].push(movedCard);
        } else {
            // Handle drop on a card
            const [overRowIndex, overColIndex, overCardIndex] = over.id
                .toString()
                .split("-")
                .map(Number);

            // If dragging to the same position, do nothing
            if (
                activeRowIndex === overRowIndex &&
                activeColIndex === overColIndex &&
                activeCardIndex === overCardIndex
            ) {
                setActiveCard(null);
                setActiveCardPosition(null);
                setOverPosition(null);
                setCardWidth(null);
                return;
            }

            // If moving to a different column, add to the bottom by default
            if (activeColIndex !== overColIndex) {
                // Add to the end of the target column
                newBoardData[overRowIndex][overColIndex].push(movedCard);
            } else if (activeRowIndex !== overRowIndex) {
                // If moving to a different row, add to the position indicated
                newBoardData[overRowIndex][overColIndex].splice(
                    overCardIndex,
                    0,
                    movedCard
                );
            } else {
                // If moving within the same cell, just reorder
                newBoardData[activeRowIndex][activeColIndex] = arrayMove(
                    boardData[activeRowIndex][activeColIndex],
                    activeCardIndex,
                    overCardIndex
                );
            }
        }

        // Update the state with the new board data
        setBoardData(newBoardData);
        setActiveCard(null);
        setActiveCardPosition(null);
        setOverPosition(null);
        setCardWidth(null);
    };

    // Generate unique IDs for each card based on its position
    const getCardId = (
        rowIndex: number,
        colIndex: number,
        cardIndex: number
    ) => {
        return `${rowIndex}-${colIndex}-${cardIndex}`;
    };

    return (
        <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            collisionDetection={closestCenter}
        >
            <div className="rounded-lg border border-border bg-card shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-muted/50 dark:bg-muted/20">
                        <TableRow>
                            <TableHead className="w-[150px] font-semibold"></TableHead>
                            {columnHeaders.map((header, index) => (
                                <TableHead
                                    key={index}
                                    className="text-center font-semibold py-4"
                                >
                                    {header}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {boardData.map((row, rowIndex) => (
                            <TableRow
                                key={rowIndex}
                                className="border-b border-border no-highlight"
                            >
                                <TableCell className="font-medium bg-muted/30 dark:bg-muted/10 text-foreground">
                                    {rowHeaders[rowIndex] ||
                                        `Row ${rowIndex + 1}`}
                                </TableCell>
                                {row.map((cell, colIndex) => (
                                    <TableCell
                                        key={colIndex}
                                        className="p-2 align-top"
                                    >
                                        <div className="min-h-[100px] p-2 rounded-md bg-card">
                                            {cell.length > 0 ? (
                                                <SortableContext
                                                    items={cell.map(
                                                        (_, cardIndex) =>
                                                            getCardId(
                                                                rowIndex,
                                                                colIndex,
                                                                cardIndex
                                                            )
                                                    )}
                                                    strategy={
                                                        verticalListSortingStrategy
                                                    }
                                                >
                                                    {cell.map(
                                                        (card, cardIndex) => (
                                                            <React.Fragment
                                                                key={`card-${card.id}`}
                                                            >
                                                                {/* Show drop indicator at current position only if in the same column */}
                                                                {overPosition &&
                                                                    activeCardPosition &&
                                                                    overPosition.rowIndex ===
                                                                        rowIndex &&
                                                                    overPosition.colIndex ===
                                                                        colIndex &&
                                                                    activeCardPosition.colIndex ===
                                                                        colIndex &&
                                                                    overPosition.cardIndex ===
                                                                        cardIndex && (
                                                                        <DropIndicator />
                                                                    )}

                                                                <div
                                                                    data-card-id={getCardId(
                                                                        rowIndex,
                                                                        colIndex,
                                                                        cardIndex
                                                                    )}
                                                                >
                                                                    <KanbanCard
                                                                        id={getCardId(
                                                                            rowIndex,
                                                                            colIndex,
                                                                            cardIndex
                                                                        )}
                                                                        card={
                                                                            card
                                                                        }
                                                                        cardTemplate={
                                                                            cardTemplate
                                                                        }
                                                                    />
                                                                </div>

                                                                {/* Show drop indicator after the last card if dragging from a different column */}
                                                                {overPosition &&
                                                                    activeCardPosition &&
                                                                    overPosition.rowIndex ===
                                                                        rowIndex &&
                                                                    overPosition.colIndex ===
                                                                        colIndex &&
                                                                    ((activeCardPosition.colIndex ===
                                                                        colIndex &&
                                                                        overPosition.cardIndex ===
                                                                            cardIndex +
                                                                                1) ||
                                                                        (activeCardPosition.colIndex !==
                                                                            colIndex &&
                                                                            cardIndex ===
                                                                                cell.length -
                                                                                    1)) && (
                                                                        <DropIndicator />
                                                                    )}
                                                            </React.Fragment>
                                                        )
                                                    )}
                                                </SortableContext>
                                            ) : (
                                                // Empty cell droppable area
                                                <EmptyCell
                                                    rowIndex={rowIndex}
                                                    colIndex={colIndex}
                                                />
                                            )}
                                        </div>
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <DragOverlay
                dropAnimation={{
                    duration: 300,
                    easing: "cubic-bezier(0.2, 0, 0, 1)",
                }}
            >
                {activeCard ? (
                    <Card
                        className="cursor-move border border-border overflow-hidden"
                        style={{ width: cardWidth ? `${cardWidth}px` : "auto" }}
                    >
                        {cardTemplate({
                            card: activeCard,
                            isDragOverlay: true,
                        })}
                    </Card>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
};
