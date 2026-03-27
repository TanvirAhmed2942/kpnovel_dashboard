import React from 'react'
import PendingListCard, { type PendingItem } from './PendingListCard'

const pendingBooks: PendingItem[] = [
    {
        title: 'The Chronicles of Eternity',
        subtitle: 'by Sarah Mitchell  •  Fantasy',
        time: 'about 12 hours ago',
    },
    {
        title: 'The Chronicles of Eternity',
        subtitle: 'by Sarah Mitchell  •  Fantasy',
        time: 'about 12 hours ago',
    },
    {
        title: 'The Chronicles of Eternity',
        subtitle: 'by Sarah Mitchell  •  Fantasy',
        time: 'about 12 hours ago',
    },
]

function PendingBooks() {
    return <PendingListCard heading="Pending Books" count={3} items={pendingBooks} />
}

export default PendingBooks
