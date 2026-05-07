'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/lib/i18n'
import type { Artwork } from '@/lib/types'

export function WorkCard({ artwork }: { artwork: Artwork }) {
    const { lang } = useLanguage()

    return (
        <Link href={`/works/${artwork.slug}`} className="block group">
            <div className="relative overflow-hidden aspect-[4/3] bg-paper">
                <Image
                    src={`/artworks/${artwork.image}`}
                    alt={lang === 'ja' ? artwork.title : artwork.titleEn}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end p-5 md:p-7">
                    <div className="text-paper opacity-0 group-hover:opacity-100 transition-[opacity,transform] duration-300 translate-y-2 group-hover:translate-y-0">
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
    )
}
