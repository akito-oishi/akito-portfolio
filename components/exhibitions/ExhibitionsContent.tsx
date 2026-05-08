'use client'

import { useLanguage } from '@/lib/i18n'
import { FadeIn } from '@/components/ui/FadeIn'
import { isOngoing, isFuture } from '@/lib/exhibitions'
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
                                {grouped[year].map((ex) => {
                                    const ongoing = isOngoing(ex)
                                    const future = isFuture(ex)
                                    const past = !ongoing && !future

                                    const rowClass = past
                                        ? 'opacity-40'
                                        : ongoing
                                        ? ''
                                        : ''

                                    const titleClass = ongoing
                                        ? 'font-serif text-xl font-light text-ink'
                                        : past
                                        ? 'font-serif text-xl font-light text-muted'
                                        : 'font-serif text-xl font-light text-ink'

                                    return (
                                        <div
                                            key={ex.startDate + ex.title}
                                            className={`flex flex-col md:flex-row gap-2 md:gap-12 py-7 border-b border-border first:border-t transition-opacity ${rowClass}`}
                                        >
                                            <div className="md:w-52 shrink-0">
                                                <p className="font-sans text-xs text-muted tracking-wider">
                                                    {ex.startDate.replace(/-/g, '.')} — {ex.endDate.replace(/-/g, '.')}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="font-sans text-xs text-muted tracking-wider mb-1 flex items-center gap-2">
                                                    {ongoing && (
                                                        <>
                                                            <span className="text-ink" aria-hidden="true">●</span>
                                                            <span className="sr-only">{t('exhibitions', 'ongoing')}</span>
                                                        </>
                                                    )}
                                                    {lang === 'ja' ? ex.location : ex.locationEn}
                                                </p>
                                                {ex.link ? (
                                                    <a
                                                        href={ex.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`${titleClass} hover:opacity-60 transition-opacity`}
                                                    >
                                                        {lang === 'ja' ? ex.title : ex.titleEn}
                                                    </a>
                                                ) : (
                                                    <p className={titleClass}>
                                                        {lang === 'ja' ? ex.title : ex.titleEn}
                                                    </p>
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
