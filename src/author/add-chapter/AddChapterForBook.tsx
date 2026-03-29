"use client"

import SmallPageInfo from "@/components/common/smallPageInfo/smallPageInfo"

import ChapterCreation from "@/src/author/add-chapter/ChapterCreation"

type AddChapterForBookProps = {
  bookName: string
}

export default function AddChapterForBook({ bookName }: AddChapterForBookProps) {
  const decodedBookName = decodeURIComponent(bookName)
  return (
    <div className="space-y-4">
      <SmallPageInfo
        title="Add chapter"
        description={`Create chapters for “${decodedBookName}”.`}
      />
      <ChapterCreation
        bookName={decodedBookName}
        onSave={(chapters) => {
          console.log("save chapters", bookName, chapters)
        }}
        onDraft={(chapters) => {
          console.log("draft chapters", bookName, chapters)
        }}
      />
    </div>
  )
}
