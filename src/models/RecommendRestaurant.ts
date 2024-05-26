class RecommendRestaurant {
  id: number
  name: string
  description: string
  category?: string
  image_link?: string
  site_link?: string

  constructor(
      id: number,
      name: string,
      description: string,
      category?: string,
      image_link?: string,
      site_link?: string
  ) {
      this.id = id
      this.name = name
      this.description = description
      this.category = category
      this.image_link = image_link
      this.site_link = site_link
  }
}

export default RecommendRestaurant;