"use client"

import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export type ScriptInputValues = {
  headScripts: string
  bodyScripts: string
}

export type ScriptInputProps = ScriptInputValues & {
  onHeadScriptsChange: (value: string) => void
  onBodyScriptsChange: (value: string) => void
}

function ScriptBlock({
  id,
  label,
  description,
  value,
  onChange,
  minRows,
}: {
  id: string
  label: string
  description: string
  value: string
  onChange: (value: string) => void
  minRows: number
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-gray-900">
        {label}
      </Label>
      <p className="text-sm text-gray-500">{description}</p>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        rows={minRows}
        placeholder="<!-- Paste trusted script tags only -->"
        className={cn(
          "border-input placeholder:text-muted-foreground flex min-h-[140px] w-full resize-y rounded-lg border bg-white px-3 py-2 font-mono text-sm text-gray-900 shadow-xs outline-none",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
        )}
      />
    </div>
  )
}

export default function ScriptInput({
  headScripts,
  bodyScripts,
  onHeadScriptsChange,
  onBodyScriptsChange,
}: ScriptInputProps) {
  return (
    <div className="space-y-5">
      <p className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
        Custom scripts
      </p>
      <div className="space-y-6">
        <ScriptBlock
          id="scripts-head"
          label="Head"
          description={
            "Inserted before closing </head>. Use for analytics snippets, meta tags, or styles."
          }
          value={headScripts}
          onChange={onHeadScriptsChange}
          minRows={6}
        />
        <ScriptBlock
          id="scripts-body"
          label="Body (end)"
          description={
            "Inserted before closing </body>. Use for deferred scripts."
          }
          value={bodyScripts}
          onChange={onBodyScriptsChange}
          minRows={6}
        />
      </div>
    </div>
  )
}
