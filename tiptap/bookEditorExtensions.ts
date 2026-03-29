import Highlight from "@tiptap/extension-highlight"
import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import TextAlign from "@tiptap/extension-text-align"
import Typography from "@tiptap/extension-typography"
import { CharacterCount } from "@tiptap/extensions/character-count"
import { Placeholder } from "@tiptap/extensions/placeholder"
import type { Extensions } from "@tiptap/core"
import StarterKit from "@tiptap/starter-kit"

export type BookEditorExtensionsOptions = {
  placeholder?: string
}

/**
 * Opinionated extension bundle for long-form / book-style writing.
 * Compose elsewhere with `useEditor({ extensions: getBookEditorExtensions({ ... }) })`.
 */
export function getBookEditorExtensions(
  options: BookEditorExtensionsOptions = {}
): Extensions {
  const placeholder = options.placeholder ?? "Write here…"

  return [
    StarterKit.configure({
      heading: {
        levels: [2, 3, 4],
      },
      bulletList: {
        HTMLAttributes: { class: "list-disc pl-6 my-2" },
      },
      orderedList: {
        HTMLAttributes: { class: "list-decimal pl-6 my-2" },
      },
      blockquote: {
        HTMLAttributes: {
          class: "border-l-4 border-muted-foreground/30 pl-4 italic my-3",
        },
      },
      codeBlock: {
        HTMLAttributes: {
          class:
            "rounded-lg bg-muted/80 p-3 font-mono text-sm my-3 overflow-x-auto",
        },
      },
      horizontalRule: {
        HTMLAttributes: { class: "my-6 border-border" },
      },
      link: {
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline underline-offset-2 font-medium",
          rel: "noopener noreferrer",
        },
      },
    }),
    Placeholder.configure({
      placeholder,
      emptyEditorClass: "is-editor-empty",
    }),
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
    Highlight.configure({
      multicolor: true,
    }),
    Subscript,
    Superscript,
    Typography,
    CharacterCount.configure({
      limit: null,
    }),
  ]
}
