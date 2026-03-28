"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type CategoryCell =
  | { kind: "badge"; label: string }
  | { kind: "text"; value: string };

type PeriodRankingRow = {
  rank: number;
  title: string;
  description: string;
  author: string;
  category: CategoryCell;
  dailyVotes: number;
  views: number;
};

const rows: PeriodRankingRow[] = [
  {
    rank: 1,
    title: "The Immortal's Path",
    description: "An epic tale of magic and destiny..",
    author: "Chen Wei",
    category: { kind: "badge", label: "Fantasy" },
    dailyVotes: 1245,
    views: 1245,
  },
  {
    rank: 2,
    title: "The Immortal's Path",
    description: "An epic tale of magic and destiny..",
    author: "Chen Wei",
    category: { kind: "text", value: "1245" },
    dailyVotes: 1245,
    views: 1245,
  },
  {
    rank: 3,
    title: "The Immortal's Path",
    description: "An epic tale of magic and destiny..",
    author: "Chen Wei",
    category: { kind: "text", value: "1245" },
    dailyVotes: 1245,
    views: 1245,
  },
];

function CategoryDisplay({ category }: { category: CategoryCell }) {
  if (category.kind === "badge") {
    return (
      <span className="inline-flex rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600">
        {category.label}
      </span>
    );
  }
  return (
    <span className="text-base text-gray-600 tabular-nums">{category.value}</span>
  );
}

function PeriodWiseBookRank() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="border-b border-gray-200 bg-slate-50 hover:bg-slate-50">
            <TableHead className="pl-6 text-base font-semibold text-gray-700">
              Rank
            </TableHead>
            <TableHead className="text-base font-semibold text-gray-700">
              Book
            </TableHead>
            <TableHead className="text-base font-semibold text-gray-700">
              Author
            </TableHead>
            <TableHead className="text-base font-semibold text-gray-700">
              Category
            </TableHead>
            <TableHead className="text-base font-semibold text-gray-700">
              Daily Votes
            </TableHead>
            <TableHead className="pr-6 text-base font-semibold text-gray-700">
              Views
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.rank}
              className="border-b border-gray-100 hover:bg-gray-50/40"
            >
              <TableCell className="pl-6 py-5 align-middle">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  {row.rank}
                </div>
              </TableCell>
              <TableCell className="py-5 align-middle">
                <p className="font-semibold text-gray-900">{row.title}</p>
                <p className="mt-0.5 max-w-[280px] text-sm text-gray-500">
                  {row.description}
                </p>
              </TableCell>
              <TableCell className="py-5 text-base text-gray-600">
                {row.author}
              </TableCell>
              <TableCell className="py-5 align-middle">
                <CategoryDisplay category={row.category} />
              </TableCell>
              <TableCell className="py-5 text-base tabular-nums text-gray-600">
                {row.dailyVotes.toLocaleString()}
              </TableCell>
              <TableCell className="pr-6 py-5 text-base tabular-nums text-gray-600">
                {row.views.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default PeriodWiseBookRank;
