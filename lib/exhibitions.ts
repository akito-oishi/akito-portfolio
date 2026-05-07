import exhibitionsData from '@/data/exhibitions.json'
import type { Exhibition } from './types'

const exhibitions = exhibitionsData as Exhibition[]

export function getExhibitions(): Exhibition[] {
    return [...exhibitions].sort(
        (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    )
}

export function getLatestExhibition(): Exhibition | null {
    return getExhibitions()[0] ?? null
}

export function isOngoing(exhibition: Exhibition): boolean {
    const now = new Date()
    const start = new Date(exhibition.startDate)
    const end = new Date(exhibition.endDate)
    return now >= start && now <= end
}
