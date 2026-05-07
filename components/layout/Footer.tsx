'use client'

import { useLanguage } from '@/lib/i18n'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-border">
      <div className="max-w-content mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-sans text-xs text-muted tracking-widest">
          {t('footer', 'rights')}
        </p>
        <div className="flex items-center gap-6">
          <a
            href="mailto:huangredanshi@gmail.com"
            className="font-sans text-xs text-muted hover:text-ink transition-colors tracking-wider"
          >
            huangredanshi@gmail.com
          </a>
          <a
            href="https://www.instagram.com/akito_oishi"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-xs text-muted hover:text-ink transition-colors tracking-wider"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  )
}
