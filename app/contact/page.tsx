'use client'

import { useState, type FormEvent } from 'react'
import { useLanguage } from '@/lib/i18n'
import { FadeIn } from '@/components/ui/FadeIn'

export default function ContactPage() {
    const { t } = useLanguage()
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? ''

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!formspreeId || formspreeId === 'placeholder') {
            setStatus('error')
            return
        }
        setStatus('sending')
        try {
            const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
                method: 'POST',
                body: new FormData(e.currentTarget),
                headers: { Accept: 'application/json' },
            })
            setStatus(res.ok ? 'success' : 'error')
        } catch {
            setStatus('error')
        }
    }

    return (
        <div className="pt-24 pb-24 min-h-screen">
            <div className="max-w-2xl mx-auto px-6 md:px-12">
                <FadeIn>
                    <h1 className="font-serif text-2xl font-light tracking-wider mb-16">
                        {t('contact', 'title')}
                    </h1>
                </FadeIn>

                <FadeIn delay={0.1}>
                    <div className="border border-border p-8 md:p-12">
                        <div className="mb-12 pb-10 border-b border-border flex gap-10">
                            {/* Instagram */}
                            <div>
                                <p className="font-sans text-xs tracking-widest text-muted mb-3">Instagram</p>
                                <a
                                    href="https://www.instagram.com/akito_oishi"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram @akito_oishi"
                                    className="text-ink hover:opacity-50 transition-opacity inline-block"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                        <circle cx="12" cy="12" r="4" />
                                        <circle cx="17.5" cy="6.5" r="0.7" fill="currentColor" stroke="none" />
                                    </svg>
                                </a>
                            </div>

                            {/* Email */}
                            <div>
                                <p className="font-sans text-xs tracking-widest text-muted mb-3">Email</p>
                                <a
                                    href="mailto:huangredanshi@gmail.com"
                                    className="font-sans text-sm text-ink hover:opacity-50 transition-opacity"
                                >
                                    huangredanshi@gmail.com
                                </a>
                            </div>
                        </div>

                        {status === 'success' ? (
                            <p className="font-sans text-sm text-muted leading-relaxed">
                                {t('contact', 'success')}
                            </p>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-10" noValidate>
                                <div>
                                    <label htmlFor="contact-name" className="block font-sans text-xs tracking-widest text-muted mb-3">
                                        {t('contact', 'name')}
                                    </label>
                                    <input
                                        id="contact-name"
                                        name="name"
                                        type="text"
                                        required
                                        autoComplete="name"
                                        className="w-full bg-transparent border-b border-border pb-2 font-sans text-sm text-ink focus:outline-none focus:border-ink transition-colors"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="contact-email" className="block font-sans text-xs tracking-widest text-muted mb-3">
                                        {t('contact', 'email')}
                                    </label>
                                    <input
                                        id="contact-email"
                                        name="email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        className="w-full bg-transparent border-b border-border pb-2 font-sans text-sm text-ink focus:outline-none focus:border-ink transition-colors"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="contact-message" className="block font-sans text-xs tracking-widest text-muted mb-3">
                                        {t('contact', 'message')}
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        required
                                        rows={6}
                                        className="w-full bg-transparent border-b border-border pb-2 font-sans text-sm text-ink focus:outline-none focus:border-ink transition-colors resize-none"
                                    />
                                </div>

                                <div className="flex items-center gap-6 pt-2">
                                    <button
                                        type="submit"
                                        disabled={status === 'sending'}
                                        className="font-sans text-xs tracking-widest border border-ink px-8 py-3 hover:bg-ink hover:text-paper transition-colors disabled:opacity-40"
                                    >
                                        {status === 'sending' ? t('contact', 'sending') : t('contact', 'send')}
                                    </button>
                                    {status === 'error' && (
                                        <p className="font-sans text-xs text-muted" role="alert">
                                            {t('contact', 'error')}
                                        </p>
                                    )}
                                </div>
                            </form>
                        )}
                    </div>
                </FadeIn>
            </div>
        </div>
    )
}
