'use client'

import { useLanguage } from '@/lib/i18n'
import { FadeIn } from '@/components/ui/FadeIn'
import type { ProcessItem } from '@/lib/types'

export function ProcessContent({ items }: { items: ProcessItem[] }) {
    const { lang, t } = useLanguage()

    return (
        <section className="max-w-content mx-auto px-6 md:px-12 py-20 md:py-24">
            <FadeIn>
                <h1 className="font-serif text-2xl font-light tracking-wider mb-16 md:mb-20">
                    {t('process', 'title')}
                </h1>
            </FadeIn>

            <div className="flex flex-col gap-20 md:gap-28">
                {items.map((item, i) => {
                    const isEven = i % 2 === 0
                    const title = lang === 'ja' ? item.title : item.titleEn
                    const description = lang === 'ja' ? item.description : item.descriptionEn
                    const videoSrc = `/drawingProcess/${item.video}`

                    return (
                        <FadeIn key={item.id} delay={0.1}>
                            <div
                                className={`flex flex-col md:flex-row gap-10 md:gap-16 items-center ${
                                    isEven ? '' : 'md:flex-row-reverse'
                                }`}
                            >
                                <div className="w-full md:w-1/2 shrink-0 bg-paper">
                                    <video
                                        src={videoSrc}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        className="w-full h-auto block"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h2 className="font-serif text-xl md:text-2xl font-light tracking-wider mb-5">
                                        {title}
                                    </h2>
                                    <p className="font-sans text-sm leading-relaxed text-muted">
                                        {description}
                                    </p>
                                </div>
                            </div>
                        </FadeIn>
                    )
                })}
            </div>
        </section>
    )
}
