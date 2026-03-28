"use client";

import { useCallback, useMemo, useState } from "react";
import SmallPageInfo from "@/components/common/smallPageInfo/smallPageInfo";
import FilterSearch from "@/components/common/filter/FIlterSearch";
import Stats from "@/components/common/stats/Stats";
import { BookIcon, BookOpenIcon, EyeIcon, UserIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AuthorCards from "./AuthorCards";
import type { Author, AuthorApprovalStatus } from "./types";

const APPLICATION_DEFAULTS = {
    bio: "Passionate writer sharing stories and ideas.",
    experienceLabel: "1 Year Writing Experience",
    genres: ["Fantasy", "Romance"] as string[],
};

const INITIAL_AUTHORS: Author[] = [
    {
        id: "1",
        name: "Chen Wei",
        email: "chenwei123@gmail.com",
        avatarUrl: "/author.jpg",
        accountStatus: "Active",
        approvalStatus: "Approved",
        rating: 4.9,
        reviewCount: 12345,
        chapters: 12,
        books: 12,
        likes: 245,
        views: 12456,
    },
    {
        id: "2",
        name: "Chen Wei",
        email: "chenwei123@gmail.com",
        avatarUrl: "/author.jpg",
        accountStatus: "Active",
        approvalStatus: "Approved",
        rating: 4.9,
        reviewCount: 12345,
        chapters: 12,
        books: 12,
        likes: 245,
        views: 12456,
    },
    {
        id: "3",
        name: "Chen Wei",
        email: "chenwei123@gmail.com",
        avatarUrl: "/author.jpg",
        accountStatus: "Suspended",
        approvalStatus: "Approved",
        rating: 4.7,
        reviewCount: 8200,
        chapters: 8,
        books: 5,
        likes: 120,
        views: 8900,
    },
    {
        id: "4",
        name: "Chen Wei",
        email: "chenwei123@gmail.com",
        avatarUrl: "/author.jpg",
        accountStatus: "Active",
        approvalStatus: "Pending",
        rating: 4.2,
        reviewCount: 312,
        chapters: 3,
        books: 1,
        likes: 48,
        views: 1200,
        ...APPLICATION_DEFAULTS,
    },
    {
        id: "5",
        name: "Chen Wei",
        email: "chenwei123@gmail.com",
        avatarUrl: "/author.jpg",
        accountStatus: "Active",
        approvalStatus: "Pending",
        rating: 4.2,
        reviewCount: 312,
        chapters: 3,
        books: 1,
        likes: 48,
        views: 1200,
        ...APPLICATION_DEFAULTS,
    },
    {
        id: "6",
        name: "Jordan Lee",
        email: "jordan.lee@example.com",
        avatarUrl: "/author.jpg",
        accountStatus: "Active",
        approvalStatus: "Pending",
        rating: 4.0,
        reviewCount: 56,
        chapters: 2,
        books: 1,
        likes: 12,
        views: 340,
        bio: "Fantasy and slice-of-life shorts. Building a cozy reader community.",
        experienceLabel: "2 Years Writing Experience",
        genres: ["Fantasy", "Romance", "Slice of Life"],
    },
    {
        id: "7",
        name: "Sam Rivera",
        email: "sam.r@example.com",
        avatarUrl: "/author.jpg",
        accountStatus: "Suspended",
        approvalStatus: "Rejected",
        rating: 3.5,
        reviewCount: 12,
        chapters: 1,
        books: 1,
        likes: 3,
        views: 89,
        ...APPLICATION_DEFAULTS,
    },
    {
        id: "8",
        name: "Sam Rivera",
        email: "sam.r@example.com",
        avatarUrl: "/author.jpg",
        accountStatus: "Suspended",
        approvalStatus: "Rejected",
        rating: 3.5,
        reviewCount: 12,
        chapters: 1,
        books: 1,
        likes: 3,
        views: 89,
        ...APPLICATION_DEFAULTS,
    },
    {
        id: "9",
        name: "Morgan Kim",
        email: "morgan.kim@example.com",
        avatarUrl: "/author.jpg",
        accountStatus: "Active",
        approvalStatus: "Rejected",
        rating: 4.1,
        reviewCount: 90,
        chapters: 4,
        books: 2,
        likes: 22,
        views: 560,
        bio: "Sci-fi worldbuilder. Previously published short fiction online.",
        experienceLabel: "3 Years Writing Experience",
        genres: ["Sci-Fi", "Mystery"],
    },
];

function matchesSearch(author: Author, query: string) {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
        author.name.toLowerCase().includes(q) ||
        author.email.toLowerCase().includes(q)
    );
}

function AuthorsLayout() {
    const [authors, setAuthors] = useState<Author[]>(() => [...INITIAL_AUTHORS]);
    const [approvalTab, setApprovalTab] =
        useState<AuthorApprovalStatus>("Pending");
    const [searchQuery, setSearchQuery] = useState("");

    const authorsByApproval = useMemo(() => {
        const match = (a: Author) => matchesSearch(a, searchQuery);
        return {
            Approved: authors.filter(
                (a) => a.approvalStatus === "Approved" && match(a)
            ),
            Pending: authors.filter(
                (a) => a.approvalStatus === "Pending" && match(a)
            ),
            Rejected: authors.filter(
                (a) => a.approvalStatus === "Rejected" && match(a)
            ),
        };
    }, [authors, searchQuery]);

    const handleApprove = useCallback((id: string) => {
        setAuthors((prev) =>
            prev.map((a) =>
                a.id === id
                    ? {
                        ...a,
                        approvalStatus: "Approved" as const,
                        accountStatus: "Active",
                    }
                    : a
            )
        );
    }, []);

    const handleReject = useCallback((id: string) => {
        setAuthors((prev) =>
            prev.map((a) =>
                a.id === id ? { ...a, approvalStatus: "Rejected" as const } : a
            )
        );
    }, []);

    const stats = [
        {
            title: "Total Authors",
            value: 100,
            icon: <UserIcon />,
        },
        {
            title: "Total Books",
            value: 100,
            icon: <BookIcon />,
        },
        {
            title: "Total Chapters",
            value: 100,
            icon: <BookOpenIcon />,
        },
        {
            title: "Total Views",
            value: 100,
            icon: <EyeIcon />,
        },
    ];

    const search = {
        placeholder: "Search here...",
        value: searchQuery,
        onChange: setSearchQuery,
    };

    return (
        <div className="space-y-4">
            <SmallPageInfo title="Authors" description="Manage your authors" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Stats
                        key={stat.title}
                        title={stat.title}
                        value={stat.value}
                        icon={stat.icon}
                        iconColor="text-white"
                        iconBackgroundColor="bg-linear-to-r from-blue-500 to-violet-500"
                    />
                ))}
            </div>

            <Tabs
                value={approvalTab}
                onValueChange={(v) => setApprovalTab(v as AuthorApprovalStatus)}
                className="w-full gap-4"
            >
                <TabsList className="inline-flex h-11 w-full max-w-md items-center justify-start gap-1  border border-gray-200 bg-gray-50/90 p-1 shadow-none sm:w-auto">
                    <TabsTrigger
                        value="Pending"
                        className="data-active:bg-linear-to-r from-yellow-500 to-orange-500 px-5 py-2 text-sm font-medium text-gray-900 hover:text-gray-950 shadow-none data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-none"
                    >
                        Pending
                    </TabsTrigger>
                    <TabsTrigger
                        value="Approved"
                        className="data-active:bg-linear-to-r from-green-500 to-lime-500 hover:text-gray-950 px-5 py-2 text-sm font-medium text-gray-900 shadow-none data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-none"
                    >
                        Approved
                    </TabsTrigger>

                    <TabsTrigger
                        value="Rejected"
                        className="data-active:bg-linear-to-r from-pink-500 to-red-500 hover:text-gray-950 px-5 py-2 text-sm font-medium text-gray-900 shadow-none data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-none"
                    >
                        Rejected
                    </TabsTrigger>
                </TabsList>

                <div className="mt-4">
                    <FilterSearch search={search} selects={[]} />
                </div>
                <TabsContent value="Pending" className="mt-4 outline-none">
                    <AuthorCards
                        authors={authorsByApproval.Pending}
                        onApprove={handleApprove}
                        onReject={handleReject}
                    />
                </TabsContent>
                <TabsContent value="Approved" className="mt-4 outline-none">
                    <AuthorCards authors={authorsByApproval.Approved} />
                </TabsContent>

                <TabsContent value="Rejected" className="mt-4 outline-none">
                    <AuthorCards
                        authors={authorsByApproval.Rejected}
                        onApprove={handleApprove}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default AuthorsLayout;
