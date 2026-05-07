import { getExhibitions } from '@/lib/exhibitions'
import { ExhibitionsContent } from '@/components/exhibitions/ExhibitionsContent'

export const metadata = {
    title: '展覧会 | Exhibitions',
    description: '大石晃人の展覧会情報。Exhibition information for Nihonga artist Akito Oishi.',
}

export default function ExhibitionsPage() {
    const exhibitions = getExhibitions()
    return <ExhibitionsContent exhibitions={exhibitions} />
}
