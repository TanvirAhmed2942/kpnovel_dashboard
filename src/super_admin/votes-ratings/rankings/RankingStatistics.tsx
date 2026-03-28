import { Card, CardContent } from "@/components/ui/card";

const topBooks = [
  { period: "Daily", title: "The Immortal's Path", votes: 1234 },
  { period: "Weekly", title: "The Immortal's Path", votes: 1234 },
  { period: "Monthly", title: "The Immortal's Path", votes: 1234 },
] as const;

const topCategories = [
  { rank: 1, name: "Fantasy", books: 345, totalVotes: 1234 },
  { rank: 2, name: "Action", books: 345, totalVotes: 1234 },
  { rank: 3, name: "Romance", books: 345, totalVotes: 1234 },
] as const;

function RankingStatistics() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {topBooks.map((item) => (
          <Card
            key={item.period}
            className="rounded-xl border border-gray-200 bg-white py-0 shadow-none ring-0"
          >
            <CardContent className="space-y-2 p-5">
              <p className="text-sm text-gray-500">
                Top Book ({item.period})
              </p>
              <p className="text-base font-bold text-gray-900">{item.title}</p>
              <p className="text-lg font-semibold text-amber-500">
                {item.votes.toLocaleString()} votes
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="mb-4 text-lg font-bold text-gray-900">
          Top Categories of this month
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {topCategories.map((cat) => (
            <Card
              key={cat.rank}
              className="rounded-xl border border-gray-200 bg-white py-0 shadow-none ring-0"
            >
              <CardContent className="flex gap-4 p-5">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-700 text-sm font-bold text-white">
                  {cat.rank}
                </div>
                <div className="min-w-0 flex-1 space-y-3">
                  <p className="font-bold text-gray-900">{cat.name}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-gray-500">Books</span>
                      <span className="font-semibold text-gray-900 tabular-nums">
                        {cat.books.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-gray-500">Total Votes</span>
                      <span className="font-semibold text-gray-900 tabular-nums">
                        {cat.totalVotes.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RankingStatistics;
