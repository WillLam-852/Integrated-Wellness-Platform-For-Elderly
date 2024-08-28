class RecommendMeal {
  id: number
  name: string
  description: string
  calories: number
  protein: number
  fat: number
  carbohydrates: number
  meal_time: string
  category?: string
  image_link?: string
  recipe_link?: string

  constructor(
      id: number,
      name: string,
      description: string,
      calories: number,
      protein: number,
      fat: number,
      carbohydrates: number,
      meal_time: string,
      category?: string,
      image_link?: string,
      recipe_link?: string
  ) {
      this.id = id
      this.name = name
      this.description = description
      this.calories = calories
      this.protein = protein
      this.fat = fat
      this.carbohydrates = carbohydrates
      this.meal_time = meal_time
      this.category = category
      this.image_link = image_link
      this.recipe_link = recipe_link
  }
}

export default RecommendMeal