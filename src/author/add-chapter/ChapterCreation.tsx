"use client"

import * as React from "react"
import { PlusIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import TipTapEditor from "@/tiptap/TipTapEditor"

export type ChapterDraft = {
    id: string
    title: string
    summary: string
    /** Rich text HTML from TipTap (`editor.getHTML()`). */
    content: string
    lastSavedAs?: "draft" | "saved"
}

function createEmptyChapter(index: number): ChapterDraft {
    return {
        id: typeof crypto !== "undefined" && crypto.randomUUID
            ? crypto.randomUUID()
            : `ch-${Date.now()}-${index}`,
        title: `Chapter ${index}`,
        summary: "",
        content: "",
    }
}

export type ChapterCreationProps = {
    bookName?: string
    /** Persist / API hook when user clicks Save */
    onSave?: (chapters: ChapterDraft[]) => void | Promise<void>
    /** Persist draft hook when user clicks Draft */
    onDraft?: (chapters: ChapterDraft[]) => void | Promise<void>
}

export default function ChapterCreation({
    bookName,
    onSave,
    onDraft,
}: ChapterCreationProps) {
    const [chapters, setChapters] = React.useState<ChapterDraft[]>(() => [
        createEmptyChapter(1),
    ])
    const [activeId, setActiveId] = React.useState<string>(() => chapters[0]!.id)

    const activeChapter = chapters.find((c) => c.id === activeId) ?? chapters[0]!
    const activeIndex = chapters.findIndex((c) => c.id === activeId)

    const patchActive = React.useCallback(
        (patch: Partial<Pick<ChapterDraft, "title" | "summary" | "content">>) => {
            setChapters((prev) =>
                prev.map((c) => (c.id === activeId ? { ...c, ...patch } : c))
            )
        },
        [activeId]
    )

    const addChapter = () => {
        const next = createEmptyChapter(chapters.length + 1)
        setChapters((prev) => [...prev, next])
        setActiveId(next.id)
    }

    const handleDraft = async () => {
        const next = chapters.map((c) =>
            c.id === activeId ? { ...c, lastSavedAs: "draft" as const } : c
        )
        setChapters(next)
        try {
            await onDraft?.(next)
            toast.success("Draft saved", {
                description: bookName ? `“${bookName}” — ${activeChapter.title}` : undefined,
            })
        } catch {
            toast.error("Could not save draft")
        }
    }

    const handleSave = async () => {
        const next = chapters.map((c) =>
            c.id === activeId ? { ...c, lastSavedAs: "saved" as const } : c
        )
        setChapters(next)
        try {
            await onSave?.(next)
            toast.success("Chapter saved", {
                description: bookName ? `“${bookName}” — ${activeChapter.title}` : undefined,
            })
        } catch {
            toast.error("Could not save")
        }
    }

    const sidebarLabel = (ch: ChapterDraft, index: number) => {
        const name = ch.title.trim() || `Chapter ${index + 1}`
        return `Chapter ${index + 1}: ${name}`
    }

    return (
        <div
            className={cn(
                "flex min-h-[min(640px,calc(100vh-12rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm ring-1 ring-foreground/5"
            )}
        >
            <header className="shrink-0 space-y-3 border-b border-border bg-muted/20 px-4 py-4 md:px-6">
                <div className="space-y-1.5">
                    <Label htmlFor="chapter-title" className="text-xs text-gray-700">
                        Chapter title
                    </Label>
                    <Input
                        id="chapter-title"
                        value={activeChapter.title}
                        onChange={(e) => patchActive({ title: e.target.value })}
                        placeholder={`Chapter ${activeIndex + 1}: Chapter name`}
                        className="h-11 rounded-lg bg-gray-100/80 text-base text-gray-700 dark:bg-input/30"
                    />
                </div>
                <div className="space-y-1.5">
                    <Label htmlFor="chapter-summary" className="text-xs text-gray-700">
                        Chapter summary
                    </Label>
                    <textarea
                        id="chapter-summary"
                        value={activeChapter.summary}
                        onChange={(e) => patchActive({ summary: e.target.value })}
                        placeholder={`Chapter ${activeIndex + 1} summary: What happens in this chapter…`}
                        rows={2}
                        className={cn(
                            "w-full resize-y rounded-lg border border-input bg-gray-100/80 px-2.5 py-2 text-sm text-gray-700 outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30"
                        )}
                    />
                </div>
            </header>

            <div className="flex min-h-0 flex-1 flex-col md:flex-row">
                <aside
                    className={cn(
                        "flex w-full shrink-0 flex-col gap-2 border-border p-3 md:w-[min(22%,280px)] md:border-r md:border-b-0 border-b",
                        "bg-muted/10"
                    )}
                >
                    <p className="text-gray-700 px-1 text-xs font-medium tracking-wide uppercase">
                        Chapters
                    </p>
                    <nav className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto">
                        {chapters.map((ch, index) => {
                            const selected = ch.id === activeId
                            return (
                                <button
                                    key={ch.id}
                                    type="button"
                                    onClick={() => setActiveId(ch.id)}
                                    className={cn(
                                        "rounded-lg border px-3 py-2.5 text-left text-sm transition-colors",
                                        selected
                                            ? "border-primary bg-primary/10 font-medium text-gray-700"
                                            : "border-transparent bg-gray-100/80 text-gray-700 hover:border-border hover:bg-muted/50 hover:text-gray-700"
                                    )}
                                >
                                    <span className="line-clamp-2">{sidebarLabel(ch, index)}</span>
                                    {ch.lastSavedAs === "draft" ? (
                                        <span className="mt-1 block text-[10px] font-normal text-amber-600">
                                            Draft
                                        </span>
                                    ) : null}
                                    {ch.lastSavedAs === "saved" ? (
                                        <span className="mt-1 block text-[10px] font-normal text-emerald-600">
                                            Saved
                                        </span>
                                    ) : null}
                                </button>
                            )
                        })}
                    </nav>
                    <Button
                        type="button"
                        variant="outline"
                        className="mt-1 w-full shrink-0 gap-1.5 border-dashed hover:bg-gray-100/80 hover:text-gray-700"
                        onClick={addChapter}
                    >
                        <PlusIcon className="size-4" />
                        Add new
                    </Button>
                </aside>

                <main className="flex min-h-0 min-w-0 flex-1 flex-col p-4 md:min-h-[420px] md:p-6">
                    <Label htmlFor="chapter-body" className="sr-only">
                        Chapter content
                    </Label>
                    <TipTapEditor
                        key={activeId}
                        content={activeChapter.content}
                        onChange={(html) => patchActive({ content: html })}
                        placeholder="Write the chapter here…"
                        className="min-h-screen flex-1 border-input bg-gray-100/80 text-gray-800 dark:bg-input/30"
                    />
                </main>
            </div>

            <footer className="flex shrink-0 flex-wrap items-center justify-end gap-2 border-t border-border bg-muted/20 px-4 py-4 md:px-6">
                <Button type="button" variant="outline" onClick={handleDraft}>
                    Draft
                </Button>
                <Button type="button" onClick={handleSave}>
                    Save
                </Button>
            </footer>
        </div>
    )
}
