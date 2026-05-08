import artworksData from '@/data/artworks.json'
import seriesData from '@/data/series.json'
import type { Artwork, Series } from './types'

const artworks = artworksData as Artwork[]

export function getArtworks(): Artwork[] {
    return artworks
}

export function getFeaturedArtworks(): Artwork[] {
    const featured = artworks.filter((a) => a.featured)
    return featured.length > 0 ? featured : artworks.slice(0, 4)
}

export function getHeroArtwork(): Artwork | undefined {
    return getFeaturedArtworks()[0]
}

export function getArtworkBySlug(slug: string): Artwork | undefined {
    return artworks.find((a) => a.slug === slug)
}

export function getAdjacentArtworks(slug: string): {
    prev: Artwork | null
    next: Artwork | null
} {
    const index = artworks.findIndex((a) => a.slug === slug)
    return {
        prev: index > 0 ? artworks[index - 1] : null,
        next: index < artworks.length - 1 ? artworks[index + 1] : null,
    }
}

export function getTopArtworks(): Artwork[] {
    return artworks.filter((a) => a.showOnTop)
}

export function getSeriesList(): Series[] {
    return seriesData as Series[]
}

export function getArtworksBySeries(seriesSlug: string): Artwork[] {
    return artworks.filter((a) => a.series === seriesSlug)
}

export function getSeriesRepresentative(seriesSlug: string): Artwork | undefined {
    return artworks.find((a) => a.series === seriesSlug)
}
