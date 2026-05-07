'use client'

import { useLanguage } from '@/lib/i18n'
import { FadeIn } from '@/components/ui/FadeIn'
import { WorkCard } from './WorkCard'
import type { Artwork } from '@/lib/types'

export function WorksGrid({ artworks }: { artworks: Artwork[] }) {
    const { t } = useLanguage()

    return (
        <section className="max-w-content mx-auto px-6 md:px-12 py-20 md:py-24">
            <FadeIn>
                <h1 className="font-serif text-2xl font-light tracking-wider mb-16 md:mb-20">
                    {t('works', 'title')}
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
