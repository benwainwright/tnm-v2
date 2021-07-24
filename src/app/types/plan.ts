import { PlanCategory } from "@app/config"

export default interface Plan {
  name: string
  mealsPerDay: number
  costPerMeal: number
  category: PlanCategory
}
