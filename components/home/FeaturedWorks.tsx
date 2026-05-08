'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/lib/i18n'
import { FadeIn } from '@/components/ui/FadeIn'
import type { Artwork } from '@/lib/types'

export function FeaturedWorks({ artworks }: { artworks: Artwork[] }) {
    const { lang } = useLanguage()

    return (
        <section className="max-w-content mx-auto px-6 md:px-12 py-16 md:py-24">
            <div className="grid grid-cols-2 gap-3 md:gap-6">
                {artworks.map((artwork, i) => (
                    <FadeIn key={artwork.slug} delay={i * 0.07}>
                        <Link href={`/works/${artwork.slug}`} className="block group">
                            <div className="relative aspect-[3/4] overflow-hidden bg-paper">
                                <Image
                                    src={`/artworks/${artwork.image}`}
                                    alt={lang === 'ja' ? artwork.title : artwork.titleEn}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                    sizes="(max-width: 768px) 50vw, 40vw"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end p-4 md:p-6">
                                    <div className="text-paper opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-[opacity,transform] duration-300">
                                        <p className="font-serif text-base md:text-lg font-light">
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
