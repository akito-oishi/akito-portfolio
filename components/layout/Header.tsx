'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/lib/i18n'
import { LangToggle } from '@/components/ui/LangToggle'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { t } = useLanguage()
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const isHome = pathname === '/'
  const bgClass = scrolled || !isHome ? 'bg-paper/95 backdrop-blur-sm shadow-[0_1px_0_0_#e0e0e0]' : 'bg-transparent'

  const navLinks = [
    { href: '/works', label: t('nav', 'works') },
    { href: '/profile', label: t('nav', 'profile') },
    { href: '/exhibitions', label: t('nav', 'exhibitions') },
    { href: '/contact', label: t('nav', 'contact') },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${bgClass}`}>
      <nav className="max-w-content mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-base tracking-[0.2em] text-ink hover:opacity-70 transition-opacity"
        >
          Akito Oishi
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`font-sans text-xs tracking-widest transition-colors ${
                pathname.startsWith(href) ? 'text-ink' : 'text-muted hover:text-ink'
              }`}
            >
              {label}
            </Link>
          ))}
          <LangToggle />
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden font-sans text-xs tracking-widest text-ink"
          aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
        >
          {menuOpen ? 'CLOSE' : 'MENU'}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-paper border-t border-border">
          <div className="max-w-content mx-auto px-6 py-8 flex flex-col gap-6">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="font-sans text-sm tracking-widest text-ink"
              >
                {label}
              </Link>
            ))}
            <div className="pt-4 border-t border-border">
              <LangToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
