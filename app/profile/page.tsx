import profileData from '@/data/profile.json'
import type { Profile } from '@/lib/types'
import { ProfileContent } from '@/components/profile/ProfileContent'

export const metadata = {
    title: 'プロフィール | Profile',
    description: '日本画家・大石晃人のプロフィール。Biography of Nihonga artist Akito Oishi.',
}

export default function ProfilePage() {
    return <ProfileContent profile={profileData as Profile} />
}
