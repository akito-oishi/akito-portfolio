import { getArtworks } from '@/lib/artworks'
import { WorksGrid } from '@/components/works/WorksGrid'

export const metadata = {
    title: '作品 | Works',
    description: '大石晃人の作品一覧。',
}

export default function WorksPage() {
    const artworks = getArtworks()
    return (
        <div className="pt-16">
            <WorksGrid artworks={artworks} />
        </div>
    )
}
