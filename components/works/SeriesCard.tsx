'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/lib/i18n'
import type { Series } from '@/lib/types'

type Props = {
    series: Series
    representativeImage?: string
    artworkCount: number
}

export function SeriesCard({ series, representativeImage, artworkCount }: Props) {
    const { lang } = useLanguage()
    const title = lang === 'ja' ? series.title : series.titleEn

    return (
        <Link href={`/works/series/${series.slug}`} className="block group">
            <div className="relative overflow-hidden bg-paper">
                {representativeImage ? (
                    <Image
                        src={`/artworks/${representativeImage}`}
                        alt={title}
                        width={0}
                        height={0}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                ) : (
                    <div className="aspect-[4/3] bg-paper" />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end p-5 md:p-7">
                    <div className="text-paper opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-[opacity,transform] duration-300">
                        <p className="font-serif text-lg font-light">{title}</p>
                        <p className="font-sans text-xs tracking-wider mt-1 opacity-80">
                            {artworkCount} works
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
                <p className="font-serif text-base font-light">{title}</p>
                <p className="font-sans text-xs text-muted">{artworkCount}</p>
            </div>
        </Link>
    )
}
