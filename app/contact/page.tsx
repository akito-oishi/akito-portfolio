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
                    <div className="mb-16 pb-12 border-b border-border">
                        <a
                            href="https://www.instagram.com/akito_oishi"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-sans text-sm tracking-wider hover:text-muted transition-colors flex items-center gap-3"
                            aria-label="Instagram @akito_oishi"
                        >
                            <span>{t('contact', 'followOn')}</span>
                            <span className="text-muted">@akito_oishi →</span>
                        </a>
                    </div>
                </FadeIn>

                <FadeIn delay={0.2}>
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
                </FadeIn>
            </div>
        </div>
    )
}
