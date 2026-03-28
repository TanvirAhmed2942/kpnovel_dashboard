import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

type RecentComment = {
    id: string;
    initials: string;
    userName: string;
    bookTitle: string;
    body: string;
    timeAgo: string;
};

const comments: RecentComment[] = [
    {
        id: "1",
        initials: "JS",
        userName: "John Smith",
        bookTitle: "The Immortal's Path",
        body: "Amazing chapter! Can't wait for the next..",
        timeAgo: "2 min ago",
    },
    {
        id: "2",
        initials: "JS",
        userName: "John Smith",
        bookTitle: "The Immortal's Path",
        body: "Amazing chapter! Can't wait for the next..",
        timeAgo: "1 hour ago",
    },
    {
        id: "3",
        initials: "JS",
        userName: "John Smith",
        bookTitle: "The Immortal's Path",
        body: "Amazing chapter! Can't wait for the next..",
        timeAgo: "3 hours ago",
    },
];

function RecentComments() {
    return (
        <Card className="rounded-xl border border-indigo-100 bg-white shadow-xs">
            <CardHeader className="px-6 pb-4 pt-6">
                <CardTitle className="text-base font-bold text-gray-900">
                    Recent Comments
                </CardTitle>
            </CardHeader>
      <CardContent className="px-0 pb-2 pt-0">
        <ul>
          {comments.map((c) => (
            <li
              key={c.id}
              className="border-b border-gray-100 px-6 py-4 last:border-b-0"
            >
              <div className="flex items-start gap-4">
                                <div
                                    className="flex size-11 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-violet-600 text-sm font-semibold text-white"
                                    aria-hidden
                                >
                                    {c.initials}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm leading-snug">
                                        <span className="font-bold text-gray-900">
                                            {c.userName}
                                        </span>
                                        <span className="font-normal text-gray-800">
                                            {" "}
                                            on {c.bookTitle}
                                        </span>
                                    </p>
                                    <p className="mt-1.5 text-sm text-gray-500">{c.body}</p>
                                    <p className="mt-1 text-xs text-gray-500">{c.timeAgo}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}

export default RecentComments;
