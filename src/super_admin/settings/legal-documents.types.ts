export type LegalDocStatus = "published" | "draft"

export type LegalDocumentRow = {
  id: string
  title: string
  status: LegalDocStatus
  lastUpdated: string
  wordCount: number
  /** Rich HTML body (TipTap / stored legal copy). */
  bodyHtml: string
}
