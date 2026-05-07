import { notFound } from 'next/navigation'
import { getArtworks, getArtworkBySlug, getAdjacentArtworks } from '@/lib/artworks'
import { WorkDetail } from '@/components/works/WorkDetail'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return getArtworks().map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const artwork = getArtworkBySlug(params.slug)
  if (!artwork) return {}
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://akito-oishi.vercel.app'
  const title = artwork.title
  const description = artwork.comment || `${artwork.title} — ${artwork.year}`
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: `${baseUrl}/artworks/${artwork.image}` }],
    },
  }
}

export default function WorkDetailPage({ params }: { params: { slug: string } }) {
  const artwork = getArtworkBySlug(params.slug)
  if (!artwork) notFound()

  const { prev, next } = getAdjacentArtworks(params.slug)

  return <WorkDetail artwork={artwork} prev={prev} next={next} />
}
