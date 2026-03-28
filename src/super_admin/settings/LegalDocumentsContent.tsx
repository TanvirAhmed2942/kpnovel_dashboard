"use client";

import { FileText, SquarePen } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type DocStatus = "published" | "draft";

type LegalDoc = {
  id: string;
  title: string;
  status: DocStatus;
  lastUpdated: string;
  wordCount: number;
};

const documents: LegalDoc[] = [
  {
    id: "1",
    title: "Terms of Service",
    status: "published",
    lastUpdated: "2025-03-15",
    wordCount: 2840,
  },
  {
    id: "2",
    title: "Privacy Policy",
    status: "published",
    lastUpdated: "2025-03-10",
    wordCount: 1920,
  },
  {
    id: "3",
    title: "FAQ's",
    status: "draft",
    lastUpdated: "2025-02-28",
    wordCount: 856,
  },
  {
    id: "4",
    title: "About Us",
    status: "published",
    lastUpdated: "2025-01-20",
    wordCount: 412,
  },
];

function statusBadge(status: DocStatus) {
  if (status === "published") {
    return (
      <Badge
        variant="outline"
        className="border-0 bg-emerald-50 font-medium capitalize text-emerald-700"
      >
        published
      </Badge>
    );
  }
  return (
    <Badge
      variant="outline"
      className="border-0 bg-amber-50 font-medium capitalize text-amber-800"
    >
      draft
    </Badge>
  );
}

export function LegalDocumentsContent() {
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
                className="h-9 shrink-0 gap-2 rounded-lg border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              >
                <SquarePen className="size-4" />
                Edit
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
