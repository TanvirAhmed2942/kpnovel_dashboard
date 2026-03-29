"use client"

import { EditorContent, useEditor } from "@tiptap/react"
import * as React from "react"

import { cn } from "@/lib/utils"

import { getBookEditorExtensions } from "./bookEditorExtensions"
import { TipTapEditorToolbar } from "./TipTapEditorToolbar"

import "./tiptap-editor.css"

/** Normalize stored chapter body: empty → empty doc, plain text → paragraphs, HTML passthrough. */
export function normalizeChapterContentHtml(raw: string): string {
  const t = raw.trim()
  if (!t) return "<p></p>"
  if (t.startsWith("<") && /<\s*(p|h[1-6]|div|ul|ol|blockquote)/i.test(t)) {
    return raw
  }
  const esc = raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
  const blocks = esc.split(/\n\n+/)
  const inner = blocks
    .map((block) => {
      const withBreaks = block.split("\n").join("<br/>")
      return `<p>${withBreaks}</p>`
    })
    .join("")
  return inner || "<p></p>"
}

export type TipTapEditorProps = {
  /** HTML from `editor.getHTML()` */
  content: string
  onChange: (html: string) => void
  placeholder?: string
  className?: string
  /** Class on the scrollable editor shell */
  editorShellClassName?: string
  editable?: boolean
  showToolbar?: boolean
  showCharacterCount?: boolean
  /** Minimum height of the editing area */
  minHeight?: string
}

export default function TipTapEditor({
  content,
  onChange,
  placeholder = "Write the chapter here…",
  className,
  editorShellClassName,
  editable = true,
  showToolbar = true,
  showCharacterCount = true,
  minHeight = "min-h-[280px]",
}: TipTapEditorProps) {
  const extensions = React.useMemo(
    () => getBookEditorExtensions({ placeholder }),
    [placeholder]
  )

  const editor = useEditor(
    {
      immediatelyRender: false,
      shouldRerenderOnTransaction: true,
      editable,
      extensions,
      content: normalizeChapterContentHtml(content),
      editorProps: {
        attributes: {
          class: cn(
            "prose-book max-w-none text-sm leading-relaxed text-foreground md:text-sm",
            minHeight
          ),
        },
      },
      onUpdate: ({ editor: ed }) => {
        onChange(ed.getHTML())
      },
    },
    [extensions, editable]
  )

  return (
    <div
      className={cn(
        "tiptap-editor-root flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-input bg-gray-100/80 dark:bg-input/30",
        className
      )}
    >
      {showToolbar ? (
        <TipTapEditorToolbar
          editor={editor}
          showCharacterCount={showCharacterCount}
        />
      ) : null}
      <div
        className={cn(
          "min-h-0 flex-1 overflow-y-auto px-2 py-2 md:px-3 md:py-3",
          editorShellClassName
        )}
      >
        <EditorContent editor={editor} className="h-full min-h-[inherit]" />
      </div>
    </div>
  )
}
