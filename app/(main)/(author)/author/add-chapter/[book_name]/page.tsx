import AddChapterForBook from "@/src/author/add-chapter/AddChapterForBook"

type PageProps = {
  params: Promise<{ book_name: string }>
}

/**
 * Dynamic segment `[book_name]` matches one URL path part (use encodeURIComponent when linking).
 * Example: /author/add-chapter/My%20Novel
 */
export default async function AuthorAddChapterPage({ params }: PageProps) {
  const { book_name } = await params
  /** Next.js decodes the segment; we encode again when linking from the client. */
  return <AddChapterForBook bookName={book_name} />
}
