"use client"

import * as React from "react"
import { EyeIcon, FileText, SquarePen } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import LegalDocumentViewEditModal, {
  type LegalDocumentModalMode,
} from "./LegalDocumentViewEditModal"
import type { LegalDocStatus, LegalDocumentRow } from "./legal-documents.types"

export type { LegalDocumentRow, LegalDocStatus } from "./legal-documents.types"

function countWordsFromHtml(html: string): number {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
  if (!text) return 0
  return text.split(/\s+/).length
}

const initialDocuments: LegalDocumentRow[] = [
  {
    id: "1",
    title: "Terms of Service",
    status: "published",
    lastUpdated: "2025-03-15",
    wordCount: 2840,
    bodyHtml: `<h2>Terms of Service</h2><p>These terms govern your use of our platform. By accessing or using the service, you agree to be bound by this agreement.</p><p><strong>1. Acceptance of terms</strong></p><p>You must read and accept these terms before using any feature that collects or processes personal data.</p><p><strong>2. Changes</strong></p><p>We may update these terms from time to time. Continued use after changes constitutes acceptance.</p>`,
  },
  {
    id: "2",
    title: "Privacy Policy",
    status: "published",
    lastUpdated: "2025-03-10",
    wordCount: 1920,
    bodyHtml: `<h2>Privacy Policy</h2><p>We respect your privacy. This policy describes how we collect, use, and protect your information.</p><ul><li>What data we collect</li><li>How we use it</li><li>Your rights and choices</li></ul><p>For questions, contact our data protection contact.</p>`,
  },
  {
    id: "3",
    title: "Copy Right Notice",
    status: "draft",
    lastUpdated: "2025-02-28",
    wordCount: 856,
    bodyHtml: `<h2>Copy Right Notice</h2><p><em>Draft — content in progress.</em></p><p>This is the copy right notice for the platform.</p>`,
  },
  {
    id: "4",
    title: "About Us",
    status: "published",
    lastUpdated: "2025-01-20",
    wordCount: 412,
    bodyHtml: `<h2>About us</h2><p>We build tools for authors and readers. Our mission is to make publishing accessible and fair.</p><blockquote><p>Storytelling connects the world.</p></blockquote>`,
  },
]

function statusBadge(status: LegalDocStatus) {
  if (status === "published") {
    return (
      <Badge
        variant="outline"
        className="border-0 bg-emerald-50 font-medium capitalize text-emerald-700"
      >
        published
      </Badge>
    )
  }
  return (
    <Badge
      variant="outline"
      className="border-0 bg-amber-50 font-medium capitalize text-amber-800"
    >
      draft
    </Badge>
  )
}

export function LegalDocumentsContent() {
  const [documents, setDocuments] =
    React.useState<LegalDocumentRow[]>(initialDocuments)
  const [modalOpen, setModalOpen] = React.useState(false)
  const [activeDoc, setActiveDoc] = React.useState<LegalDocumentRow | null>(
    null
  )
  const [modalMode, setModalMode] =
    React.useState<LegalDocumentModalMode>("view")

  const openModal = (doc: LegalDocumentRow, mode: LegalDocumentModalMode) => {
    setActiveDoc(doc)
    setModalMode(mode)
    setModalOpen(true)
  }

  const handleModalOpenChange = (open: boolean) => {
    setModalOpen(open)
    if (!open) setActiveDoc(null)
  }

  const handleSave = (docId: string, bodyHtml: string) => {
    const today = new Date().toISOString().slice(0, 10)
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === docId
          ? {
            ...d,
            bodyHtml,
            wordCount: countWordsFromHtml(bodyHtml),
            lastUpdated: today,
          }
          : d
      )
    )
  }

  return (
    <div className="space-y-4">
      <Card className="rounded-xl border border-gray-200 bg-white py-5 shadow-none ring-0">
        <CardHeader className="px-5 pb-0 pt-0">
          <CardTitle className="text-base font-bold text-gray-900">
            Legal Documents
          </CardTitle>
          <CardDescription className="text-sm text-gray-500">
            Modify or update terms of service, privacy policies, and other legal
            documents
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="space-y-3">
        {documents.map((doc) => (
          <Card
            key={doc.id}
            className="rounded-xl border border-gray-200 bg-white py-0 shadow-none ring-0"
          >
            <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-5">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
                <FileText className="size-6" strokeWidth={1.5} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-gray-900">
                    {doc.title}
                  </span>
                  {statusBadge(doc.status)}
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Last updated: {doc.lastUpdated} •{" "}
                  {doc.wordCount.toLocaleString()} words
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                className="h-9 shrink-0 gap-2 rounded-lg border-gray-200 bg-gray-100/80 hover:bg-gray-200/80 hover:text-gray-700"
                onClick={() => openModal(doc, "view")}
              >
                <EyeIcon className="size-4" />
                View
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-9 shrink-0 gap-2 rounded-lg border-gray-200 bg-gray-100/80 text-gray-700 hover:bg-gray-200/80 hover:text-gray-700"
                onClick={() => openModal(doc, "edit")}
              >
                <SquarePen className="size-4" />
                Edit
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <LegalDocumentViewEditModal
        open={modalOpen}
        onOpenChange={handleModalOpenChange}
        doc={activeDoc}
        mode={modalMode}
        onSave={handleSave}
      />
    </div>
  )
}
