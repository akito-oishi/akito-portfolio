export type Artwork = {
    slug: string
    title: string
    titleEn: string
    year: number
    size: string
    medium: string
    mediumEn: string
    comment: string
    commentEn: string
    image: string
    featured: boolean
    tags: string[]
}

export type Exhibition = {
    title: string
    titleEn: string
    location: string
    locationEn: string
    startDate: string
    endDate: string
    description: string
    descriptionEn: string
    link: string
}

export type BiographyEntry = {
    year: string
    text: string
    textEn: string
}

export type Profile = {
    name: string
    nameEn: string
    bio: BiographyEntry[]
    email: string
    instagram: string
}
