'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/lib/i18n'
import { WorkNav } from './WorkNav'
import type { Artwork } from '@/lib/types'

type Props = {
  artwork: Artwork
  prev: Artwork | null
  next: Artwork | null
}

export function WorkDetail({ artwork, prev, next }: Props) {
  const { lang, t } = useLanguage()
  const title = lang === 'ja' ? artwork.title : artwork.titleEn
  const medium = lang === 'ja' ? artwork.medium : artwork.mediumEn
  const comment = lang === 'ja' ? artwork.comment : artwork.commentEn

  return (
    <div className="pt-24 pb-24 min-h-screen">
      <div className="max-w-content mx-auto px-6 md:px-12">
        <div className="mb-10">
          <Link
            href={`/works/series/${artwork.series}`}
            className="font-sans text-xs tracking-widest text-muted hover:text-ink transition-colors"
          >
            {t('works', 'backToSeries')}
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
          {/* Image */}
          <div className="w-full md:w-[65%] shrink-0">
            <div className="relative aspect-[4/3] bg-paper">
              <Image
                src={`/artworks/${artwork.image}`}
                alt={title}
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 65vw"
              />
            </div>
          </div>

          {/* Info */}
          <div className="md:pt-2 flex-1">
            <h1 className="font-serif text-2xl md:text-3xl font-light mb-8 leading-snug">
              {title}
            </h1>
            <dl className="flex flex-row gap-6 md:flex-col md:gap-0 md:space-y-5">
              <div>
                <dt className="font-sans text-xs text-muted tracking-widest mb-1">
                  {t('works', 'year')}
                </dt>
                <dd className="font-sans text-sm">{artwork.year}</dd>
              </div>
              <div>
                <dt className="font-sans text-xs text-muted tracking-widest mb-1">
                  {t('works', 'size')}
                </dt>
                <dd className="font-sans text-sm">{artwork.size}</dd>
              </div>
              <div>
                <dt className="font-sans text-xs text-muted tracking-widest mb-1">
                  {t('works', 'medium')}
                </dt>
                <dd className="font-sans text-sm">{medium}</dd>
              </div>
            </dl>
            {comment && (
              <div className="mt-6 pt-5 border-t border-border">
                <p className="font-sans text-sm leading-relaxed text-muted">{comment}</p>
              </div>
            )}
          </div>
        </div>

        <WorkNav prev={prev} next={next} />
      </div>
    </div>
  )
}
