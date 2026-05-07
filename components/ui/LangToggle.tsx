'use client'

import { useLanguage } from '@/lib/i18n'

export function LangToggle() {
  const { lang, setLang } = useLanguage()

  return (
    <div className="flex items-center gap-2 font-sans text-xs tracking-widest">
      <button
        onClick={() => setLang('ja')}
        className={`transition-colors ${lang === 'ja' ? 'text-ink' : 'text-muted hover:text-ink'}`}
      >
        JP
      </button>
      <span className="text-border select-none">|</span>
      <button
        onClick={() => setLang('en')}
        className={`transition-colors ${lang === 'en' ? 'text-ink' : 'text-muted hover:text-ink'}`}
      >
        EN
      </button>
    </div>
  )
}
