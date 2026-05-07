import type { Metadata } from 'next'
import { Cormorant_Garamond, Noto_Serif_JP, Noto_Sans_JP } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/lib/i18n'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-cormorant',
  display: 'swap',
})

const notoSerif = Noto_Serif_JP({
  weight: ['300', '400', '600'],
  variable: '--font-noto-serif',
  display: 'swap',
  preload: false,
})

const notoSans = Noto_Sans_JP({
  weight: ['300', '400'],
  variable: '--font-noto-sans',
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  title: {
    template: '%s | Akito Oishi',
    default: 'Akito Oishi | 日本画家',
  },
  description:
    '日本画家・大石晃人のポートフォリオサイト。Nihonga artist based in Japan.',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: 'Akito Oishi',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="ja"
      className={`${cormorant.variable} ${notoSerif.variable} ${notoSans.variable}`}
    >
      <body className="bg-paper font-sans antialiased">
        <LanguageProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
