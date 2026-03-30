"use client"

import * as React from "react"
import { HelpCircle, Pencil, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const STORAGE_KEY = "kpnovel_super_admin_faqs"

export type FaqItem = {
    id: string
    question: string
    answer: string
    updatedAt: string
}

function loadFaqs(): FaqItem[] {
    if (typeof window === "undefined") return []
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return []
        const parsed = JSON.parse(raw) as unknown
        if (!Array.isArray(parsed)) return []
        return parsed.filter(
            (row): row is FaqItem =>
                typeof row === "object" &&
                row !== null &&
                typeof (row as FaqItem).id === "string" &&
                typeof (row as FaqItem).question === "string" &&
                typeof (row as FaqItem).answer === "string" &&
                typeof (row as FaqItem).updatedAt === "string"
        )
    } catch {
        return []
    }
}

function persistFaqs(faqs: FaqItem[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(faqs))
}

function newId() {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
        return crypto.randomUUID()
    }
    return `faq-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function todayIsoDate() {
    return new Date().toISOString().slice(0, 10)
}

export default function FaqContent() {
    const [faqs, setFaqs] = React.useState<FaqItem[]>([])
    const [hydrated, setHydrated] = React.useState(false)

    const [formOpen, setFormOpen] = React.useState(false)
    const [editingId, setEditingId] = React.useState<string | null>(null)
    const [questionDraft, setQuestionDraft] = React.useState("")
    const [answerDraft, setAnswerDraft] = React.useState("")

    const [deleteTarget, setDeleteTarget] = React.useState<FaqItem | null>(null)

    React.useEffect(() => {
        setFaqs(loadFaqs())
        setHydrated(true)
    }, [])

    React.useEffect(() => {
        if (!hydrated) return
        persistFaqs(faqs)
    }, [faqs, hydrated])

    const openCreate = () => {
        setEditingId(null)
        setQuestionDraft("")
        setAnswerDraft("")
        setFormOpen(true)
    }

    const openEdit = (item: FaqItem) => {
        setEditingId(item.id)
        setQuestionDraft(item.question)
        setAnswerDraft(item.answer)
        setFormOpen(true)
    }

    const handleFormOpenChange = (open: boolean) => {
        setFormOpen(open)
        if (!open) {
            setEditingId(null)
            setQuestionDraft("")
            setAnswerDraft("")
        }
    }

    const handleSaveFaq = () => {
        const q = questionDraft.trim()
        const a = answerDraft.trim()
        if (!q || !a) return

        const updatedAt = todayIsoDate()

        if (editingId) {
            setFaqs((prev) =>
                prev.map((row) =>
                    row.id === editingId ? { ...row, question: q, answer: a, updatedAt } : row
                )
            )
        } else {
            setFaqs((prev) => [
                { id: newId(), question: q, answer: a, updatedAt },
                ...prev,
            ])
        }
        setFormOpen(false)
        setEditingId(null)
        setQuestionDraft("")
        setAnswerDraft("")
    }

    const confirmDelete = () => {
        if (!deleteTarget) return
        setFaqs((prev) => prev.filter((row) => row.id !== deleteTarget.id))
        setDeleteTarget(null)
    }

    return (
        <div className="space-y-4">
            <Card className="rounded-xl border border-gray-200 bg-white py-5 shadow-none ring-0">
                <CardHeader className="flex flex-col gap-4 px-5 pb-0 pt-0 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-1">
                        <CardTitle className="text-base font-bold text-gray-900">
                            Frequently asked questions
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-500">
                            Add, edit, or remove questions and answers shown to users. Changes
                            are saved in this browser.
                        </CardDescription>
                    </div>
                    <Button
                        type="button"
                        className="h-9 shrink-0 gap-2 rounded-lg bg-blue-600 px-4 text-white hover:bg-blue-700"
                        onClick={openCreate}
                    >
                        <Plus className="size-4" />
                        Add FAQ
                    </Button>
                </CardHeader>
            </Card>

            {!hydrated ? (
                <p className="text-sm text-gray-500">Loading…</p>
            ) : faqs.length === 0 ? (
                <Card className="rounded-xl border border-dashed border-gray-200 bg-gray-50/50 py-10 shadow-none ring-0">
                    <CardContent className="flex flex-col items-center justify-center gap-3 px-5 text-center">
                        <div className="flex size-12 items-center justify-center rounded-xl bg-gray-100 text-gray-500">
                            <HelpCircle className="size-6" strokeWidth={1.5} />
                        </div>
                        <p className="text-sm font-medium text-gray-800">No FAQs yet</p>
                        <p className="max-w-sm text-sm text-gray-500">
                            Create your first question and answer. You can edit or delete
                            entries anytime.
                        </p>
                        <Button
                            type="button"
                            className="mt-1 h-9 gap-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                            onClick={openCreate}
                        >
                            <Plus className="size-4" />
                            Add FAQ
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-3">
                    {faqs.map((item) => (
                        <Card
                            key={item.id}
                            className="rounded-xl border border-gray-200 bg-white py-0 shadow-none ring-0"
                        >
                            <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:gap-5">
                                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
                                    <HelpCircle className="size-6" strokeWidth={1.5} />
                                </div>
                                <div className="min-w-0 flex-1 space-y-2">
                                    <p className="font-semibold text-gray-900">{item.question}</p>
                                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-600">
                                        {item.answer}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Last updated: {item.updatedAt}
                                    </p>
                                </div>
                                <div className="flex shrink-0 flex-row gap-2 sm:flex-col">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="h-9 gap-2 rounded-lg border-gray-200 bg-gray-100/80 text-gray-700 hover:bg-gray-200/80 hover:text-gray-700"
                                        onClick={() => openEdit(item)}
                                    >
                                        <Pencil className="size-4" />
                                        Edit
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="h-9 gap-2 rounded-lg border-red-200 bg-red-50/80 text-red-700 hover:bg-red-100 hover:text-red-800"
                                        onClick={() => setDeleteTarget(item)}
                                    >
                                        <Trash2 className="size-4" />
                                        Delete
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            <Dialog open={formOpen} onOpenChange={handleFormOpenChange}>
                <DialogContent
                    className="max-h-[min(90vh,640px)] gap-0 overflow-y-auto sm:max-w-lg"
                    showCloseButton
                >
                    <DialogHeader>
                        <DialogTitle className="text-gray-900">
                            {editingId ? "Edit FAQ" : "New FAQ"}
                        </DialogTitle>
                        <DialogDescription>
                            Enter a clear question and a helpful answer. Both fields are
                            required.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="faq-question">Question</Label>
                            <Input
                                id="faq-question"
                                value={questionDraft}
                                onChange={(e) => setQuestionDraft(e.target.value)}
                                placeholder="e.g. How do I reset my password?"
                                className="rounded-lg border-gray-200"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="faq-answer">Answer</Label>
                            <textarea
                                id="faq-answer"
                                value={answerDraft}
                                onChange={(e) => setAnswerDraft(e.target.value)}
                                placeholder="Write the answer users will see…"
                                rows={6}
                                className={cn(
                                    "border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex min-h-[120px] w-full rounded-lg border bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
                                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                                )}
                            />
                        </div>
                    </div>
                    <div className="border-t-0 bg-transparent p-0 pt-2 flex flex-row justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            className="rounded-lg border-gray-200 bg-gray-100/80 hover:bg-gray-200/80 hover:text-gray-700"
                            onClick={() => handleFormOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            className="rounded-lg bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
                            onClick={handleSaveFaq}
                            disabled={!questionDraft.trim() || !answerDraft.trim()}
                        >
                            Save
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog
                open={deleteTarget !== null}
                onOpenChange={(open) => {
                    if (!open) setDeleteTarget(null)
                }}
            >
                <DialogContent className="sm:max-w-md" showCloseButton>
                    <DialogHeader>
                        <DialogTitle className="text-gray-900">Delete this FAQ?</DialogTitle>
                        <DialogDescription>
                            This removes “{deleteTarget?.question.slice(0, 80)}
                            {deleteTarget && deleteTarget.question.length > 80 ? "…" : ""}”
                            from the list. You cannot undo this from here.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="border-t-0 bg-transparent p-0 pt-2 flex flex-row justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            className="rounded-lg border-gray-200 bg-gray-100/80 hover:bg-gray-200/80 hover:text-gray-700"
                            onClick={() => setDeleteTarget(null)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            className="rounded-lg bg-red-600 text-white hover:bg-red-700 hover:text-white"
                            onClick={confirmDelete}
                        >
                            Delete
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
