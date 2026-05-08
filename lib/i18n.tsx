'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

export type Lang = 'ja' | 'en'

const dict = {
  nav: {
    works: { ja: '作品', en: 'Works' },
    process: { ja: '制作風景', en: 'Process' },
    profile: { ja: 'プロフィール', en: 'Profile' },
    exhibitions: { ja: '展覧会', en: 'Exhibitions' },
    contact: { ja: 'お問い合わせ', en: 'Contact' },
  },
  home: {
    heroSubtitle: { ja: '日本画家', en: 'Nihonga Artist' },
    worksTitle: { ja: '作品', en: 'Works' },
    worksViewAll: { ja: 'すべての作品を見る →', en: 'View All Works →' },
    exhibitionsTitle: { ja: '展覧会', en: 'Exhibition' },
    exhibitionsViewAll: { ja: 'すべての展覧会を見る →', en: 'View All Exhibitions →' },
  },
  works: {
    title: { ja: '作品', en: 'Works' },
    seriesListTitle: { ja: '作品シリーズ', en: 'Works' },
    back: { ja: '← 作品一覧', en: '← Works' },
    prev: { ja: '← 前の作品', en: '← Previous' },
    next: { ja: '次の作品 →', en: 'Next →' },
    year: { ja: '制作年', en: 'Year' },
    size: { ja: 'サイズ', en: 'Size' },
    medium: { ja: '技法', en: 'Medium' },
    seriesTitle: { ja: 'シリーズ', en: 'Series' },
    backToSeries: { ja: '← シリーズ一覧', en: '← Series' },
    allWorks: { ja: 'すべての作品', en: 'All Works' },
  },
  profile: {
    title: { ja: 'プロフィール', en: 'Profile' },
    biography: { ja: '略歴', en: 'Biography' },
    exhibitions: { ja: '展示略歴', en: 'Exhibition History' },
  },
  exhibitions: {
    title: { ja: '展覧会', en: 'Exhibitions' },
    ongoing: { ja: '開催中', en: 'Ongoing' },
  },
  contact: {
    title: { ja: 'お問い合わせ', en: 'Contact' },
    followOn: { ja: 'Instagram をフォロー', en: 'Follow on Instagram' },
    name: { ja: 'お名前', en: 'Name' },
    email: { ja: 'メールアドレス', en: 'Email' },
    message: { ja: 'メッセージ', en: 'Message' },
    send: { ja: '送信する', en: 'Send Message' },
    sending: { ja: '送信中...', en: 'Sending...' },
    success: { ja: 'お問い合わせを受け付けました。', en: 'Your message has been sent.' },
    error: { ja: '送信に失敗しました。再度お試しください。', en: 'Failed to send. Please try again.' },
  },
  materials: {
    title: { ja: '素材', en: 'Materials' },
  },
  process: {
    title: { ja: '制作風景', en: 'Process' },
  },
  footer: {
    rights: { ja: '© 2026 Akito Oishi', en: '© 2026 Akito Oishi' },
  },
} as const

type Dict = typeof dict
type Section = keyof Dict
type Key<S extends Section> = keyof Dict[S]

type LanguageContextType = {
  lang: Lang
  setLang: (l: Lang) => void
  t: <S extends Section>(section: S, key: Key<S>) => string
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'ja',
  setLang: () => {},
  t: (section, key) =>
    (dict[section][key as keyof (typeof dict)[typeof section]] as { ja: string; en: string }).ja,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ja')

  const t = <S extends Section>(section: S, key: Key<S>): string => {
    const entry = dict[section][key as keyof (typeof dict)[typeof section]] as {
      ja: string
      en: string
    }
    return entry[lang]
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
