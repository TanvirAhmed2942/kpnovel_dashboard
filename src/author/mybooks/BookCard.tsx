"use client"

import { BookA, EyeIcon, PencilIcon, StarIcon, ThumbsUpIcon, Trash2Icon } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export type BookCardProps = {
    title: string
    coverImage: string
    status: "published" | "pending"
    genres: string[]
    rating: number
    reviews: number
    chapters: number
    likes: number
    views: number
    onEdit?: () => void
    onView?: () => void
    onAddChapters?: () => void
    onDelete?: () => void
}

function BookCard({
    title,
    coverImage,
    status,
    genres,
    rating,
    reviews,
    chapters,
    likes,
    views,
    onEdit,
    onView,
    onAddChapters,
    onDelete,
}: BookCardProps) {
    const statusChip =
        status === "published"
            ? "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400"
            : " text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"

    return (
        <Card className="flex h-[clamp(360px,45vh,480px)] w-full flex-col gap-2 overflow-hidden rounded-2xl border border-border bg-white p-0 shadow-sm ring-0">
            <CardHeader className="flex-[0_0_60%] overflow-hidden p-0">
                <div className="relative h-full w-full">
                    <Image
                        src={coverImage}
                        alt={title}
                        width={150}
                        height={200}
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="h-full w-full object-cover"
                    />
                </div>
            </CardHeader>

            <CardContent className="flex-1 space-y-2 overflow-hidden px-4">
                <div className="flex items-start justify-between gap-3">
                    <CardTitle className="line-clamp-1 text-[22px] leading-tight font-semibold text-gray-800">
                        {title}
                    </CardTitle>
                    <span
                        className={cn(
                            "rounded-lg px-3 py-1 text-sm font-medium capitalize",
                            statusChip
                        )}
                    >
                        {status}
                    </span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {genres.map((genre) => (
                        <span
                            key={genre}
                            className="rounded-full bg-purple-100 px-3 py-0.5 text-sm text-purple-700"
                        >
                            {genre}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <StarIcon className="size-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xl font-semibold text-gray-800">
                        {rating.toFixed(1)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                        {reviews.toLocaleString()} reviews
                    </span>
                </div>

                <div className="text-sidebar-primary flex items-center justify-between gap-3 text-base">
                    <span>{chapters} chapters</span>
                    <div className="flex items-center gap-1.5">
                        <ThumbsUpIcon className="size-5" />
                        <span className="text-sm text-muted-foreground">
                            {likes.toLocaleString()}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <EyeIcon className="size-5" />
                        <span className="text-sm text-muted-foreground">
                            {views.toLocaleString()}
                        </span>
                    </div>
                </div>
            </CardContent>

            <div className="flex items-center gap-3 border-t-0 bg-transparent px-4 pt-2 pb-4">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                type="button"
                                variant="outline"
                                className="h-10 flex-1 rounded-xl border-border/30 bg-transparent text-muted-foreground hover:bg-transparent hover:text-gray-800"
                                onClick={onEdit}
                            >
                                <PencilIcon className="mr-2 size-5" />

                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Edit book</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                type="button"
                                variant="outline"
                                className="h-10 flex-1 rounded-xl border-border/30 bg-transparent text-muted-foreground hover:bg-transparent hover:text-gray-800 disabled:opacity-50"
                                onClick={onAddChapters}
                                disabled={!onAddChapters}
                            >
                                <BookA className="mr-2 size-5" />

                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Add or manage chapters</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                type="button"
                                variant="outline"
                                className="h-10 flex-1 rounded-xl border-border/30 bg-transparent text-muted-foreground hover:bg-transparent hover:text-gray-800"
                                onClick={onView}
                            >
                                <EyeIcon className="mr-2 size-5" />

                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>View book details</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                type="button"
                                variant="outline"
                                size="icon-lg"
                                className="h-10 w-12 rounded-xl border-red-200 bg-red-50 text-red-500 hover:bg-red-50 hover:text-red-600"
                                onClick={onDelete}
                                aria-label="Delete book"
                            >
                                <Trash2Icon className="size-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Delete book</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </Card>
    )
}

export default BookCard
