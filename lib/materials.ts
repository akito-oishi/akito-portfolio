import materialsData from '@/data/materials.json'
import type { Material } from './types'

export function getMaterials(): Material[] {
    return materialsData as Material[]
}
