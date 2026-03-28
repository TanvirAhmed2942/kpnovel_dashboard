"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type TopVotedWriterRow = {
  rank: number;
  /** Bold line (mirrors book title). */
  displayName: string;
  /** Gray subline (mirrors book description / bio). */
  bio: string;
  /** Single-line name column (mirrors author on books table). */
  writerName: string;
  dailyVotes: number;
  weeklyVotes: number;
  monthlyVotes: number;
};

const rows: TopVotedWriterRow[] = [
  {
    rank: 1,
    displayName: "Chen Wei",
    bio: "An epic tale of magic and destiny..",
    writerName: "Chen Wei",
    dailyVotes: 1245,
    weeklyVotes: 1245,
    monthlyVotes: 1245,
  },
  {
    rank: 2,
    displayName: "Chen Wei",
    bio: "An epic tale of magic and destiny..",
    writerName: "Chen Wei",
    dailyVotes: 1245,
    weeklyVotes: 1245,
    monthlyVotes: 1245,
  },
  {
    rank: 3,
    displayName: "Chen Wei",
    bio: "An epic tale of magic and destiny..",
    writerName: "Chen Wei",
    dailyVotes: 1245,
    weeklyVotes: 1245,
    monthlyVotes: 1245,
  },
  {
    rank: 4,
    displayName: "Chen Wei",
    bio: "An epic tale of magic and destiny..",
    writerName: "Chen Wei",
    dailyVotes: 1245,
    weeklyVotes: 1245,
    monthlyVotes: 1245,
  },
  {
    rank: 5,
    displayName: "Chen Wei",
    bio: "An epic tale of magic and destiny..",
    writerName: "Chen Wei",
    dailyVotes: 1245,
    weeklyVotes: 1245,
    monthlyVotes: 1245,
  },
  {
    rank: 6,
    displayName: "Chen Wei",
    bio: "An epic tale of magic and destiny..",
    writerName: "Chen Wei",
    dailyVotes: 1245,
    weeklyVotes: 1245,
    monthlyVotes: 1245,
  },
];

function TopVotedWriters() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="border-b border-gray-200 bg-slate-50 hover:bg-slate-50">
            <TableHead className="pl-6 text-base font-medium text-gray-700">
              Rank
            </TableHead>
            <TableHead className="text-base font-medium text-gray-700">
              Writer
            </TableHead>
            <TableHead className="text-base font-medium text-gray-700">
              Writer Name
            </TableHead>
            <TableHead className="text-base font-medium text-gray-700">
              Daily Votes
            </TableHead>
            <TableHead className="text-base font-medium text-gray-700">
              Weekly Votes
            </TableHead>
            <TableHead className="pr-6 text-base font-medium text-gray-700">
              Monthly Votes
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
                <p className="font-semibold text-gray-900">{row.displayName}</p>
                <p className="mt-0.5 max-w-[280px] text-sm text-gray-500">
                  {row.bio}
                </p>
              </TableCell>
              <TableCell className="py-5 text-base text-gray-600">
                {row.writerName}
              </TableCell>
              <TableCell className="py-5 text-base tabular-nums text-gray-600">
                {row.dailyVotes.toLocaleString()}
              </TableCell>
              <TableCell className="py-5 text-base tabular-nums text-gray-600">
                {row.weeklyVotes.toLocaleString()}
              </TableCell>
              <TableCell className="pr-6 py-5 text-base tabular-nums text-gray-600">
                {row.monthlyVotes.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default TopVotedWriters;
