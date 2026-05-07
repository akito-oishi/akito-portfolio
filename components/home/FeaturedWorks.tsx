'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/lib/i18n'
import { FadeIn } from '@/components/ui/FadeIn'
import type { Artwork } from '@/lib/types'

export function FeaturedWorks({ artworks }: { artworks: Artwork[] }) {
    const { lang, t } = useLanguage()

    return (
        <section className="max-w-content mx-auto px-6 md:px-12 py-32 md:py-48">
            <FadeIn>
                <div className="flex items-baseline justify-between mb-12 md:mb-16">
                    <h2 className="font-serif text-2xl font-light tracking-wider">
                        {t('home', 'worksTitle')}
                    </h2>
                    <Link
                        href="/works"
                        className="font-sans text-xs tracking-widest text-muted hover:text-ink transition-colors"
                    >
                        {t('home', 'worksViewAll')}
                    </Link>
                </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {artworks.slice(0, 4).map((artwork, i) => (
                    <FadeIn key={artwork.slug} delay={i * 0.08}>
                        <Link href={`/works/${artwork.slug}`} className="block group">
                            <div className="relative overflow-hidden aspect-[4/3] bg-paper">
                                <Image
                                    src={`/artworks/${artwork.image}`}
                                    alt={lang === 'ja' ? artwork.title : artwork.titleEn}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end p-5 md:p-7">
                                    <div className="text-paper opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-[opacity,transform] duration-300">
                                        <p className="font-serif text-lg font-light">
                                            {lang === 'ja' ? artwork.title : artwork.titleEn}
                                        </p>
                                        <p className="font-sans text-xs tracking-wider mt-1 opacity-80">
                                            {artwork.year}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </FadeIn>
                ))}
            </div>
        </section>
    )
}
