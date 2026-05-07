'use client'

import { useLanguage } from '@/lib/i18n'
import { FadeIn } from '@/components/ui/FadeIn'
import { isOngoing } from '@/lib/exhibitions'
import type { Exhibition } from '@/lib/types'

export function ExhibitionsContent({ exhibitions }: { exhibitions: Exhibition[] }) {
    const { lang, t } = useLanguage()

    const grouped = exhibitions.reduce<Record<string, Exhibition[]>>((acc, ex) => {
        const year = ex.startDate.slice(0, 4)
        if (!acc[year]) acc[year] = []
        acc[year].push(ex)
        return acc
    }, {})

    const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a))

    return (
        <div className="pt-24 pb-24 min-h-screen">
            <div className="max-w-content mx-auto px-6 md:px-12">
                <FadeIn>
                    <h1 className="font-serif text-2xl font-light tracking-wider mb-16 md:mb-20">
                        {t('exhibitions', 'title')}
                    </h1>
                </FadeIn>

                {years.map((year) => (
                    <FadeIn key={year}>
                        <div className="mb-16">
                            <h2 className="font-sans text-xs tracking-widest text-muted mb-10">{year}</h2>
                            <div>
                                {grouped[year].map((ex, i) => {
                                    const ongoing = isOngoing(ex)
                                    return (
                                        <div
                                            key={i}
                                            className="flex flex-col md:flex-row gap-2 md:gap-12 py-7 border-b border-border first:border-t"
                                        >
                                            <div className="md:w-52 shrink-0">
                                                <p className="font-sans text-xs text-muted tracking-wider">
                                                    {ex.startDate.replace(/-/g, '.')} — {ex.endDate.replace(/-/g, '.')}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="font-sans text-xs text-muted tracking-wider mb-1 flex items-center gap-2">
                                                    {ongoing && (
                                                        <span className="text-ink" aria-hidden="true">●</span>
                                                    )}
                                                    {ongoing && (
                                                        <span className="sr-only">{t('exhibitions', 'ongoing')}</span>
                                                    )}
                                                    {lang === 'ja' ? ex.location : ex.locationEn}
                                                </p>
                                                <p className="font-serif text-xl font-light text-ink">
                                                    {lang === 'ja' ? ex.title : ex.titleEn}
                                                </p>
                                                {ex.link && (
                                                    <a
                                                        href={ex.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="font-sans text-xs text-muted hover:text-ink transition-colors mt-2 inline-block"
                                                        aria-label={`${lang === 'ja' ? ex.title : ex.titleEn} の詳細ページ`}
                                                    >
                                                        →
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </FadeIn>
                ))}
            </div>
        </div>
    )
}
