import React from "react";
import { Eye, Ban, CheckCircle2 } from "lucide-react";
import PageLimit from "@/components/common/pagelimit/PageLimit";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type ModerationChapterRow = {
  id: string;
  bookTitle: string;
  chapter: string;
  author: string;
  wordCount: string;
  submitted: string;
  status: "Pending" | "Published" | "Rejected";
};

const chapters: ModerationChapterRow[] = [
  { id: "1", bookTitle: "The Immortal’s Path", chapter: "Chapter 12", author: "Chen Wei", wordCount: "2354 words", submitted: "1 day ago", status: "Pending" },
  { id: "2", bookTitle: "The Immortal’s Path", chapter: "Chapter 12", author: "Chen Wei", wordCount: "2354 words", submitted: "1 day ago", status: "Pending" },
  { id: "3", bookTitle: "The Immortal’s Path", chapter: "Chapter 12", author: "Chen Wei", wordCount: "2354 words", submitted: "1 day ago", status: "Published" },
  { id: "4", bookTitle: "The Immortal’s Path", chapter: "Chapter 12", author: "Chen Wei", wordCount: "2354 words", submitted: "1 day ago", status: "Pending" },
  { id: "5", bookTitle: "The Immortal’s Path", chapter: "Chapter 12", author: "Chen Wei", wordCount: "2354 words", submitted: "1 day ago", status: "Published" },
  { id: "6", bookTitle: "The Immortal’s Path", chapter: "Chapter 12", author: "Chen Wei", wordCount: "2354 words", submitted: "1 day ago", status: "Pending" },
  { id: "7", bookTitle: "The Immortal’s Path", chapter: "Chapter 12", author: "Chen Wei", wordCount: "2354 words", submitted: "1 day ago", status: "Rejected" },
  { id: "8", bookTitle: "The Immortal’s Path", chapter: "Chapter 12", author: "Chen Wei", wordCount: "2354 words", submitted: "1 day ago", status: "Pending" },
];

function ChaptersTable() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="border-b border-gray-200 hover:bg-transparent">
            <TableHead className="pl-6 text-base font-medium text-gray-700">Book Title</TableHead>
            <TableHead className="text-base font-medium text-gray-700">Chapter</TableHead>
            <TableHead className="text-base font-medium text-gray-700">Author</TableHead>
            <TableHead className="text-base font-medium text-gray-700">Word Count</TableHead>
            <TableHead className="text-base font-medium text-gray-700">Submitted</TableHead>
            <TableHead className="text-base font-medium text-gray-700">Status</TableHead>
            <TableHead className="pr-6 text-right text-base font-medium text-gray-700">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {chapters.map((chapter) => (
            <TableRow key={chapter.id} className="border-b border-gray-100 hover:bg-transparent">
              <TableCell className="pl-6 py-4 text-[24px] leading-tight font-medium text-gray-800">
                {chapter.bookTitle}
              </TableCell>
              <TableCell className="text-sm text-gray-500">{chapter.chapter}</TableCell>
              <TableCell className="text-sm text-gray-500">{chapter.author}</TableCell>
              <TableCell className="text-sm text-gray-500">{chapter.wordCount}</TableCell>
              <TableCell className="text-sm text-gray-500">{chapter.submitted}</TableCell>
              <TableCell>
                <span
                  className={
                    chapter.status === "Published"
                      ? "inline-flex rounded-md bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-500"
                      : chapter.status === "Rejected"
                        ? "inline-flex rounded-md bg-red-50 px-3 py-1 text-xs font-medium text-red-400"
                        : "inline-flex rounded-md bg-amber-50 px-3 py-1 text-xs font-medium text-amber-500"
                  }
                >
                  {chapter.status}
                </span>
              </TableCell>
              <TableCell className="pr-6">
                <div className="flex items-center justify-end gap-4">
                  <button className="text-gray-400 transition-colors hover:text-gray-600" aria-label="View chapter">
                    <Eye className="size-4" />
                  </button>
                  <button className="text-emerald-600 transition-colors hover:text-emerald-700" aria-label="Approve chapter">
                    <CheckCircle2 className="size-4" />
                  </button>
                  <button className="text-red-400 transition-colors hover:text-red-500" aria-label="Reject chapter">
                    <Ban className="size-4" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter className="bg-transparent">
          <TableRow className="border-0 hover:bg-transparent">
            <TableCell colSpan={7} className="px-6 py-4">
              <PageLimit
                pagination={{ page: 1, pageSize: 12, totalCount: 120 }}
                onPaginationChange={() => {}}
                itemLabel="users"
                mode="summary"
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export default ChaptersTable;
