'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/lib/i18n'

type Props = {
    images: string[]
}

export function Hero({ images }: Props) {
    const { t } = useLanguage()
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        if (images.length <= 1) return
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [images.length])

    return (
        <section className="relative w-full h-screen overflow-hidden">
            {/* Slideshow */}
            <AnimatePresence mode="sync">
                <motion.div
                    key={current}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: 'easeInOut' }}
                >
                    <Image
                        src={images[current]}
                        alt=""
                        fill
                        className="object-cover"
                        priority={current === 0}
                        sizes="100vw"
                    />
                </motion.div>
            </AnimatePresence>

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
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.6 }}
            >
                <div className="w-px h-10 bg-paper/50" />
            </motion.div>
        </section>
    )
}
