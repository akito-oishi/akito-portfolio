import { notFound } from 'next/navigation'
import { getSeriesList, getArtworksBySeries } from '@/lib/artworks'
import { WorksGrid } from '@/components/works/WorksGrid'
import type { Metadata } from 'next'

export function generateStaticParams() {
    return getSeriesList().map((s) => ({ seriesSlug: s.slug }))
}

export async function generateMetadata({
    params,
}: {
    params: { seriesSlug: string }
}): Promise<Metadata> {
    const series = getSeriesList().find((s) => s.slug === params.seriesSlug)
    if (!series) return {}
    return {
        title: `${series.title} | Works`,
        description: series.description ?? `大石晃人 — ${series.title}`,
    }
}

export default function SeriesPage({ params }: { params: { seriesSlug: string } }) {
    const seriesList = getSeriesList()
    const series = seriesList.find((s) => s.slug === params.seriesSlug)
    if (!series) notFound()

    const artworks = getArtworksBySeries(params.seriesSlug)

    return (
        <div className="pt-16">
            <WorksGrid artworks={artworks} series={series} />
        </div>
    )
}
