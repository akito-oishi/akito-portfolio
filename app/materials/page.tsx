import { getMaterials } from '@/lib/materials'
import { MaterialsContent } from '@/components/materials/MaterialsContent'

export const metadata = {
    title: '素材 | Materials',
    description: '大石晃人が使用する日本画の素材。',
}

export default function MaterialsPage() {
    const materials = getMaterials()
    return (
        <div className="pt-16">
            <MaterialsContent materials={materials} />
        </div>
    )
}
