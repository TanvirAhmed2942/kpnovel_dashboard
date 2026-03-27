import React from 'react'

type PendingItem = {
    title: string
    subtitle: string
    time: string
}

type PendingListCardProps = {
    heading: string
    count: number
    items: PendingItem[]
}

function PendingListCard({ heading, count, items }: PendingListCardProps) {
    return (
        <section className="space-y-3">
            <header className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                    {heading} ({count})
                </h3>
                <button className="text-sm font-medium text-sky-600 hover:text-sky-700 transition-colors">
                    View All
                </button>
            </header>

            <div className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
                <div className="space-y-2">
                    {items.map((item) => (
                        <article
                            key={`${item.title}-${item.subtitle}-${item.time}`}
                            className="rounded-xl border border-gray-100 bg-gray-50 p-4"
                        >
                            <h4 className="text-lg leading-tight font-semibold text-gray-900">
                                {item.title}
                            </h4>
                            <p className="mt-1 text-sm text-gray-500">
                                {item.subtitle}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                                {item.time}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}

export type { PendingItem }
export default PendingListCard
