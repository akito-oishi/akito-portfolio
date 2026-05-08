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

export function isFuture(exhibition: Exhibition): boolean {
    return new Date(exhibition.startDate) > new Date()
}

export function isPast(exhibition: Exhibition): boolean {
    return new Date(exhibition.endDate) < new Date()
}

export function getTopExhibitions(min = 3): Exhibition[] {
    const all = getExhibitions()
    const now = new Date()
    const upcoming = all.filter(
        (e) => new Date(e.startDate) > now || isOngoing(e)
    )
    if (upcoming.length >= min) return upcoming
    const past = all.filter((e) => new Date(e.endDate) < now)
    return [...upcoming, ...past].slice(0, min)
}
