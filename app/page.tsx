import { getHeroArtwork, getFeaturedArtworks } from '@/lib/artworks'
import { getLatestExhibition } from '@/lib/exhibitions'
import { Hero } from '@/components/home/Hero'
import { FeaturedWorks } from '@/components/home/FeaturedWorks'
import { LatestExhibition } from '@/components/home/LatestExhibition'

export default function HomePage() {
    const hero = getHeroArtwork()
    const featured = getFeaturedArtworks()
    const latestExhibition = getLatestExhibition()

    return (
        <>
            <Hero artwork={hero} />
            <FeaturedWorks artworks={featured} />
            {latestExhibition && <LatestExhibition exhibition={latestExhibition} />}
        </>
    )
}
