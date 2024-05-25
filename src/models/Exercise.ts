class Exercise {
    id: number
    name: string
    description: string
    duration: number
    intensity_level: number
    standard?: string
    category?: string
    video_link?: string

    constructor(
        id: number,
        name: string,
        description: string,
        duration: number,
        intensity_level: number,
        standard?: string,
        category?: string,
        video_link?: string
    ) {
        this.id = id
        this.name = name
        this.description = description
        this.duration = duration
        this.intensity_level = intensity_level
        this.standard = standard
        this.category = category
        this.video_link = video_link
    }
}

export default Exercise
