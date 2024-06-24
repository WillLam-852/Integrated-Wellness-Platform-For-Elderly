class Exercise {
    id: number
    nameZH: string
    nameEN: string
    description: string
    duration: number
    intensity_level: number
    standard?: string
    category?: string
    video_link?: string

    constructor(
        id: number,
        nameZH: string,
        nameEN: string,
        description: string,
        duration: number,
        intensity_level: number,
        standard?: string,
        category?: string,
        video_link?: string
    ) {
        this.id = id
        this.nameZH = nameZH
        this.nameEN = nameEN
        this.description = description
        this.duration = duration
        this.intensity_level = intensity_level
        this.standard = standard
        this.category = category
        this.video_link = video_link
    }
}

export default Exercise
