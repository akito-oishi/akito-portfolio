import fs from 'fs'
import path from 'path'
import { getFeaturedArtworks } from '@/lib/artworks'
import { getLatestExhibition } from '@/lib/exhibitions'
import { Hero } from '@/components/home/Hero'
import { FeaturedWorks } from '@/components/home/FeaturedWorks'
import { LatestExhibition } from '@/components/home/LatestExhibition'

function getSlideImages(): string[] {
    try {
        const dir = path.join(process.cwd(), 'public', 'mainBackPic')
        const files = fs.readdirSync(dir)
        return files
            .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
            .map((f) => `/mainBackPic/${f}`)
    } catch {
        return []
    }
}

export default function HomePage() {
    const slideImages = getSlideImages()
    const featured = getFeaturedArtworks()
    const latestExhibition = getLatestExhibition()

    return (
        <>
            <Hero images={slideImages} />
            <FeaturedWorks artworks={featured} />
            {latestExhibition && <LatestExhibition exhibition={latestExhibition} />}
        </>
    )
}
