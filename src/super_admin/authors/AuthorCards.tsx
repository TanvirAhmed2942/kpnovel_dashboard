"use client";

import { EyeIcon, StarIcon, ThumbsUpIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import type { Author, AuthorApprovalStatus } from "./types";

function initialsFromName(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function applicationBadgeClass(status: AuthorApprovalStatus) {
  if (status === "Pending")
    return "border-0 bg-orange-50 font-medium text-orange-700";
  return "border-0 bg-red-50 font-medium text-red-700";
}

function ApprovedAuthorCard({ author }: { author: Author }) {
  const badgeClass =
    author.accountStatus === "Active"
      ? "border-0 bg-emerald-50 font-medium text-emerald-700"
      : "border-0 bg-red-50 font-medium text-red-700";

  return (
    <Card className="rounded-2xl border border-gray-100 bg-white py-0 shadow-md ring-0">
      <CardContent className="space-y-4 p-6">
        <div className="flex items-start gap-4">
          <div className="shrink-0 rounded-full bg-linear-to-br from-blue-500 to-violet-600 p-[3px]">
            <div className="rounded-full bg-white p-[2px]">
              <Avatar className="size-14 border-0">
                <AvatarImage src={author.avatarUrl} alt={author.name} />
                <AvatarFallback className="bg-slate-100 text-sm font-medium text-slate-600">
                  {initialsFromName(author.name)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div className="min-w-0 flex-1 pt-0.5">
            <p className="font-bold text-slate-900">{author.name}</p>
            <p className="mt-0.5 truncate text-sm text-slate-500">
              {author.email}
            </p>
          </div>

          <Badge
            variant="outline"
            className={cn("shrink-0 rounded-md", badgeClass)}
          >
            {author.accountStatus}
          </Badge>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <StarIcon className="size-5 fill-yellow-400 text-yellow-400" />
          <span className="font-bold text-slate-900">
            {author.rating.toFixed(1)}
          </span>
          <span className="text-sm text-slate-500">
            {author.reviewCount.toLocaleString()} reviews
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600">
          <span>{author.chapters} chapters</span>
          <span>{author.books} books</span>
          <span className="inline-flex items-center gap-1.5">
            <ThumbsUpIcon className="size-4" strokeWidth={1.75} />
            {author.likes.toLocaleString()}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <EyeIcon className="size-4" strokeWidth={1.75} />
            {author.views.toLocaleString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function ApplicationAuthorCard({
  author,
  onApprove,
  onReject,
}: {
  author: Author;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}) {
  const bio =
    author.bio ?? "Passionate writer sharing stories and ideas.";
  const experience =
    author.experienceLabel ?? "1 Year Writing Experience";
  const genres = author.genres?.length
    ? author.genres
    : ["Fantasy", "Romance"];

  const isPending = author.approvalStatus === "Pending";

  return (
    <Card className="rounded-2xl border border-gray-100 bg-white py-0 shadow-md ring-0">
      <CardContent className="space-y-4 p-6">
        <div className="flex items-start gap-4">
          <Avatar className="size-14 shrink-0 ring-2 ring-violet-500 ring-offset-2 ring-offset-white">
            <AvatarImage src={author.avatarUrl} alt={author.name} />
            <AvatarFallback className="bg-slate-100 text-sm font-medium text-slate-600">
              {initialsFromName(author.name)}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1 pt-0.5">
            <p className="font-bold text-slate-900">{author.name}</p>
            <p className="mt-0.5 truncate text-sm text-slate-500">
              {author.email}
            </p>
          </div>

          <Badge
            variant="outline"
            className={cn(
              "shrink-0 rounded-md",
              applicationBadgeClass(author.approvalStatus)
            )}
          >
            {author.approvalStatus}
          </Badge>
        </div>

        <p className="text-sm leading-relaxed text-slate-900">{bio}</p>

        <div className="border-t border-gray-200 pt-4">
          <p className="text-sm text-slate-700">{experience}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {genres.map((g) => (
              <span
                key={g}
                className="rounded-full bg-violet-100 px-3 py-0.5 text-xs font-medium text-violet-700"
              >
                {g}
              </span>
            ))}
          </div>
        </div>

        <div
          className={cn(
            "flex flex-wrap gap-3 pt-1",
            isPending ? "" : "justify-end"
          )}
        >
          {isPending ? (
            <Button
              type="button"
              variant="outline"
              className="min-h-10 flex-1 border-red-300 bg-white text-red-600 hover:bg-red-50 hover:text-red-700 sm:max-w-[140px] sm:flex-none"
              onClick={() => onReject?.(author.id)}
            >
              Reject
            </Button>
          ) : null}
          <Button
            type="button"
            className={cn(
              "min-h-10 border-0 bg-linear-to-r from-blue-600 to-purple-600 text-white hover:opacity-90",
              isPending ? "flex-1 sm:max-w-[140px] sm:flex-none" : "px-6"
            )}
            onClick={() => onApprove?.(author.id)}
          >
            Approve
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function AuthorCard({
  author,
  onApprove,
  onReject,
}: {
  author: Author;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}) {
  if (author.approvalStatus === "Approved") {
    return <ApprovedAuthorCard author={author} />;
  }

  return (
    <ApplicationAuthorCard
      author={author}
      onApprove={onApprove}
      onReject={onReject}
    />
  );
}

type AuthorCardsProps = {
  authors: Author[];
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
};

export default function AuthorCards({
  authors,
  onApprove,
  onReject,
}: AuthorCardsProps) {
  if (authors.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-gray-200 bg-white/80 py-12 text-center text-sm text-slate-500">
        No authors match your filters.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {authors.map((author) => (
        <AuthorCard
          key={author.id}
          author={author}
          onApprove={onApprove}
          onReject={onReject}
        />
      ))}
    </div>
  );
}
