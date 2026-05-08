'use client'

import Image from 'next/image'
import { useLanguage } from '@/lib/i18n'
import { FadeIn } from '@/components/ui/FadeIn'
import type { Material } from '@/lib/types'

export function MaterialsContent({ materials }: { materials: Material[] }) {
    const { lang, t } = useLanguage()

    return (
        <section className="max-w-content mx-auto px-6 md:px-12 py-20 md:py-24">
            <FadeIn>
                <h1 className="font-serif text-2xl font-light tracking-wider mb-16 md:mb-20">
                    {t('materials', 'title')}
                </h1>
            </FadeIn>

            <div className="flex flex-col gap-20 md:gap-28">
                {materials.map((material, i) => {
                    const isEven = i % 2 === 0
                    const title = lang === 'ja' ? material.title : material.titleEn
                    const description = lang === 'ja' ? material.description : material.descriptionEn

                    return (
                        <FadeIn key={material.id} delay={0.1}>
                            <div
                                className={`flex flex-col md:flex-row gap-10 md:gap-16 items-center ${
                                    isEven ? '' : 'md:flex-row-reverse'
                                }`}
                            >
                                <div className="w-full md:w-1/2 shrink-0">
                                    <Image
                                        src={`/artsupplies/${material.image}`}
                                        alt={title}
                                        width={0}
                                        height={0}
                                        sizes="(max-width: 768px) 100vw, 50vw"
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
