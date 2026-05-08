'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/i18n'
import { FadeIn } from '@/components/ui/FadeIn'
import { WorkCard } from './WorkCard'
import type { Artwork, Series } from '@/lib/types'

type Props = {
    artworks: Artwork[]
    series?: Series
}

export function WorksGrid({ artworks, series }: Props) {
    const { lang, t } = useLanguage()

    const heading = series
        ? lang === 'ja' ? series.title : series.titleEn
        : t('works', 'title')

    return (
        <section className="max-w-content mx-auto px-6 md:px-12 py-20 md:py-24">
            <FadeIn>
                {series && (
                    <div className="mb-8">
                        <Link
                            href="/works"
                            className="font-sans text-xs tracking-widest text-muted hover:text-ink transition-colors"
                        >
                            {t('works', 'backToSeries')}
                        </Link>
                    </div>
                )}
                <h1 className="font-serif text-2xl font-light tracking-wider mb-16 md:mb-20">
                    {heading}
                </h1>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {artworks.map((artwork, i) => (
                    <FadeIn key={artwork.slug} delay={(i % 6) * 0.05}>
                        <WorkCard artwork={artwork} />
                    </FadeIn>
                ))}
            </div>
        </section>
    )
}
