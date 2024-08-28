class RecommendRestaurant {
  id: number
  name: string
  description: string
  category: string
  image_link: string
  site_link: string
  logo_link: string
  discount: {
    discountPercentage: number
    terms: string
    validUntil: string
  }[]

  constructor(
      id: number,
      name: string,
      description: string,
      category: string,
      image_link: string,
      site_link: string,
      logo_link: string,
      discount: {
        discountPercentage: number;
        terms: string;
        validUntil: string;
      }[],

  ) {
      this.id = id
      this.name = name
      this.description = description
      this.category = category
      this.image_link = image_link
      this.site_link = site_link
      this.logo_link = logo_link
      this.discount = discount
  }
}

export default RecommendRestaurant;