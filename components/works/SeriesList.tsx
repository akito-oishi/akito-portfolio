'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/lib/i18n'
import { FadeIn } from '@/components/ui/FadeIn'
import type { Series, Artwork } from '@/lib/types'

type Props = {
    seriesList: Series[]
    artworks: Artwork[]
}

export function SeriesList({ seriesList, artworks }: Props) {
    const { lang, t } = useLanguage()

    return (
        <section className="max-w-content mx-auto px-6 md:px-12 py-20 md:py-24">
            <FadeIn>
                <h1 className="font-serif text-2xl font-light tracking-wider mb-16 md:mb-20">
                    {t('works', 'seriesListTitle')}
                </h1>
            </FadeIn>

            <div className="flex flex-col divide-y divide-border">
                {seriesList.map((series, i) => {
                    const seriesArtworks = artworks.filter((a) => a.series === series.slug)
                    const rep = seriesArtworks[0]
                    const title = lang === 'ja' ? series.title : series.titleEn
                    const description = lang === 'ja' ? series.description : series.descriptionEn

                    return (
                        <FadeIn key={series.slug} delay={i * 0.06}>
                            <Link
                                href={`/works/series/${series.slug}`}
                                className="flex flex-row gap-8 md:gap-12 py-10 group hover:opacity-80 transition-opacity"
                            >
                                {/* Portrait image */}
                                <div className="w-32 md:w-44 shrink-0">
                                    <div className="relative aspect-[3/4] overflow-hidden bg-paper">
                                        {rep ? (
                                            <Image
                                                src={`/artworks/${rep.image}`}
                                                alt={title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                                                sizes="(max-width: 768px) 128px, 176px"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-paper" />
                                        )}
                                    </div>
                                </div>

                                {/* Title + description */}
                                <div className="flex flex-col justify-center gap-3">
                                    <p className="font-serif text-xl md:text-2xl font-light tracking-wider">
                                        {title}
                                    </p>
                                    {description && (
                                        <p className="font-sans text-sm leading-relaxed text-muted max-w-sm whitespace-pre-line">
                                            {description}
                                        </p>
                                    )}
                                    <p className="font-sans text-xs text-muted tracking-wider mt-1">
                                        {seriesArtworks.length} works
                                    </p>
                                </div>
                            </Link>
                        </FadeIn>
                    )
                })}
            </div>
        </section>
    )
}
