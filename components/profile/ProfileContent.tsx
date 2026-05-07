'use client'

import Image from 'next/image'
import { useLanguage } from '@/lib/i18n'
import { FadeIn } from '@/components/ui/FadeIn'
import type { Profile } from '@/lib/types'

export function ProfileContent({ profile }: { profile: Profile }) {
    const { lang, t } = useLanguage()

    return (
        <div className="pt-24 pb-24 min-h-screen">
            <div className="max-w-content mx-auto px-6 md:px-12">
                <FadeIn>
                    <h1 className="font-serif text-2xl font-light tracking-wider mb-16 md:mb-20">
                        {t('profile', 'title')}
                    </h1>
                </FadeIn>

                <div className="flex flex-col md:flex-row gap-14 md:gap-24">
                    {/* Photo */}
                    <FadeIn className="md:w-72 shrink-0">
                        <div className="relative aspect-[3/4] overflow-hidden bg-paper">
                            <Image
                                src="/profile.jpg"
                                alt={lang === 'ja' ? profile.name : profile.nameEn}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <p className="font-serif text-xl font-light mt-5 tracking-wider">
                            {lang === 'ja' ? profile.name : profile.nameEn}
                        </p>
                    </FadeIn>

                    {/* Biography */}
                    <FadeIn className="flex-1" delay={0.1}>
                        <h2 className="font-sans text-xs tracking-widest text-muted mb-10">
                            {t('profile', 'biography')}
                        </h2>
                        <dl className="space-y-5 max-w-prose">
                            {profile.bio.map((entry) => (
                                <div key={entry.year} className="flex gap-6 md:gap-10">
                                    <dt className="font-sans text-xs text-muted w-10 shrink-0 pt-0.5">
                                        {entry.year}
                                    </dt>
                                    <dd className="font-sans text-sm leading-relaxed">
                                        {lang === 'ja' ? entry.text : entry.textEn}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}
