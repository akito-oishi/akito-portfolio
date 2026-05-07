'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/i18n'
import { FadeIn } from '@/components/ui/FadeIn'
import { isOngoing } from '@/lib/exhibitions'
import type { Exhibition } from '@/lib/types'

export function LatestExhibition({ exhibition }: { exhibition: Exhibition }) {
    const { lang, t } = useLanguage()
    const ongoing = isOngoing(exhibition)

    return (
        <section className="border-t border-border">
            <div className="max-w-content mx-auto px-6 md:px-12 py-24 md:py-36">
                <FadeIn>
                    <div className="flex items-baseline justify-between mb-12">
                        <h2 className="font-serif text-2xl font-light tracking-wider">
                            {t('home', 'exhibitionsTitle')}
                        </h2>
                        <Link
                            href="/exhibitions"
                            className="font-sans text-xs tracking-widest text-muted hover:text-ink transition-colors"
                        >
                            {t('home', 'exhibitionsViewAll')}
                        </Link>
                    </div>

                    <div className="flex flex-col gap-3">
                        <p className="font-sans text-xs text-muted tracking-wider">
                            {exhibition.startDate.replace(/-/g, '.')} — {exhibition.endDate.replace(/-/g, '.')}
                        </p>
                        <div className="flex items-center gap-3">
                            {ongoing && (
                                <span className="font-sans text-xs tracking-widest text-muted">●</span>
                            )}
                            <p className="font-sans text-xs tracking-wider text-muted">
                                {lang === 'ja' ? exhibition.location : exhibition.locationEn}
                            </p>
                        </div>
                        <p className="font-serif text-2xl md:text-3xl font-light mt-1">
                            {lang === 'ja' ? exhibition.title : exhibition.titleEn}
                        </p>
                    </div>
                </FadeIn>
            </div>
        </section>
    )
}
