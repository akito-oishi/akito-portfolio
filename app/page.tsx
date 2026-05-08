import fs from 'fs'
import path from 'path'
import { getTopArtworks } from '@/lib/artworks'
import { getTopExhibitions } from '@/lib/exhibitions'
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
    const topArtworks = getTopArtworks()
    const topExhibitions = getTopExhibitions()

    return (
        <>
            <Hero images={slideImages} />
            <FeaturedWorks artworks={topArtworks} />
            {topExhibitions.length > 0 && <LatestExhibition exhibitions={topExhibitions} />}
        </>
    )
}
