'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/i18n'
import { FadeIn } from '@/components/ui/FadeIn'
import { isOngoing } from '@/lib/exhibitions'
import type { Exhibition } from '@/lib/types'

export function LatestExhibition({ exhibitions }: { exhibitions: Exhibition[] }) {
    const { lang, t } = useLanguage()

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

                    <div className="flex flex-col divide-y divide-border">
                        {exhibitions.map((ex, i) => {
                            const ongoing = isOngoing(ex)
                            const inner = (
                                <div className="py-6 flex flex-col gap-2">
                                    <p className="font-sans text-xs text-muted tracking-wider">
                                        {ex.startDate.replace(/-/g, '.')} — {ex.endDate.replace(/-/g, '.')}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        {ongoing && (
                                            <span className="font-sans text-xs text-muted" aria-hidden="true">●</span>
                                        )}
                                        <p className="font-sans text-xs tracking-wider text-muted">
                                            {lang === 'ja' ? ex.location : ex.locationEn}
                                        </p>
                                    </div>
                                    <p className="font-serif text-xl md:text-2xl font-light mt-1">
                                        {lang === 'ja' ? ex.title : ex.titleEn}
                                    </p>
                                </div>
                            )

                            return (
                                <FadeIn key={i} delay={i * 0.06}>
                                    {ex.link ? (
                                        <a
                                            href={ex.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block hover:opacity-70 transition-opacity duration-300"
                                        >
                                            {inner}
                                        </a>
                                    ) : (
                                        <div>{inner}</div>
                                    )}
                                </FadeIn>
                            )
                        })}
                    </div>
                </FadeIn>
            </div>
        </section>
    )
}
