'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/i18n'
import type { Artwork } from '@/lib/types'

export function WorkNav({
  prev,
  next,
}: {
  prev: Artwork | null
  next: Artwork | null
}) {
  const { lang, t } = useLanguage()

  return (
    <div className="flex justify-between mt-16 pt-8 border-t border-border">
      <div>
        {prev && (
          <Link
            href={`/works/${prev.slug}`}
            className="font-sans text-xs tracking-widest text-muted hover:text-ink transition-colors"
            aria-label={lang === 'ja' ? `前の作品: ${prev.title}` : `Previous: ${prev.titleEn}`}
          >
            {t('works', 'prev')}
          </Link>
        )}
      </div>
      <div>
        {next && (
          <Link
            href={`/works/${next.slug}`}
            className="font-sans text-xs tracking-widest text-muted hover:text-ink transition-colors"
            aria-label={lang === 'ja' ? `次の作品: ${next.title}` : `Next: ${next.titleEn}`}
          >
            {t('works', 'next')}
          </Link>
        )}
      </div>
    </div>
  )
}
