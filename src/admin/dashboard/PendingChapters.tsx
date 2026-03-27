import React from 'react'
import PendingListCard, { type PendingItem } from './PendingListCard'

const pendingChapters: PendingItem[] = [
    {
        title: 'The Lost Kingdom - Ch. 24',
        subtitle: 'by Michael Brown',
        time: 'in about 3 hours',
    },
    {
        title: 'The Lost Kingdom - Ch. 24',
        subtitle: 'by Michael Brown',
        time: 'in about 3 hours',
    },
]

function PendingChapters() {
    return <PendingListCard heading="Pending Chapters" count={2} items={pendingChapters} />
}

export default PendingChapters
