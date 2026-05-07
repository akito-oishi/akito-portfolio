'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/i18n'
import type { Artwork } from '@/lib/types'

export function Hero({ artwork }: { artwork: Artwork }) {
    const { t } = useLanguage()

    return (
        <section className="relative w-full h-screen overflow-hidden">
            <Image
                src={`/artworks/${artwork.image}`}
                alt={artwork.title}
                fill
                className="object-cover"
                priority
                sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/25" />

            <div className="absolute bottom-20 left-0 right-0 flex flex-col items-center text-paper">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
                    className="text-center"
                >
                    <h1 className="font-serif text-3xl md:text-5xl tracking-[0.25em] font-light mb-3">
                        Akito Oishi
                    </h1>
                    <p className="font-sans text-xs tracking-[0.35em] uppercase opacity-75">
                        {t('home', 'heroSubtitle')}
                    </p>
                </motion.div>
            </div>

            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.6 }}
            >
                <div className="w-px h-10 bg-paper/50" />
            </motion.div>
        </section>
    )
}
