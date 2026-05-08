import { getArtworks, getSeriesList } from '@/lib/artworks'
import { SeriesList } from '@/components/works/SeriesList'

export const metadata = {
    title: '作品 | Works',
    description: '大石晃人の作品一覧。',
}

export default function WorksPage() {
    const seriesList = getSeriesList()
    const artworks = getArtworks()
    return (
        <div className="pt-16">
            <SeriesList seriesList={seriesList} artworks={artworks} />
        </div>
    )
}
