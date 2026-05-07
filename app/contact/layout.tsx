import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'お問い合わせ | Contact',
    description: '大石晃人へのお問い合わせ。Contact Nihonga artist Akito Oishi.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
