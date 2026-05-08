import processData from '@/data/process.json'
import type { ProcessItem } from './types'

export function getProcessItems(): ProcessItem[] {
    return processData as ProcessItem[]
}
