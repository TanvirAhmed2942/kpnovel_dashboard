export type AuthorApprovalStatus = "Approved" | "Pending" | "Rejected";

export type AuthorAccountStatus = "Active" | "Suspended";

export type Author = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  accountStatus: AuthorAccountStatus;
  approvalStatus: AuthorApprovalStatus;
  rating: number;
  reviewCount: number;
  chapters: number;
  books: number;
  likes: number;
  views: number;
  /** Shown on Pending / Rejected application cards */
  bio?: string;
  experienceLabel?: string;
  genres?: string[];
};
