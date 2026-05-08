import { getProcessItems } from '@/lib/process'
import { ProcessContent } from '@/components/process/ProcessContent'

export const metadata = {
    title: '技法 | Process',
    description: '大石晃人の日本画制作プロセス。',
}

export default function ProcessPage() {
    const items = getProcessItems()
    return (
        <div className="pt-16">
            <ProcessContent items={items} />
        </div>
    )
}
