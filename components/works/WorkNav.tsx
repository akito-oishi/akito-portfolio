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
  const { t } = useLanguage()

  return (
    <div className="flex justify-between mt-16 pt-8 border-t border-border">
      <div>
        {prev && (
          <Link
            href={`/works/${prev.slug}`}
            className="font-sans text-xs tracking-widest text-muted hover:text-ink transition-colors"
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
          >
            {t('works', 'next')}
          </Link>
        )}
      </div>
    </div>
  )
}
